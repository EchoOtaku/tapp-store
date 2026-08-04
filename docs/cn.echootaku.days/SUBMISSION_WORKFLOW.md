# 朝夕提交、同步与发布流程

## 1. 远程仓库约定

当前本地仓库使用以下远程命名：

| Remote | 地址 | 角色 |
| --- | --- | --- |
| `origin` | `https://github.com/Myriad-You/tapp-store.git` | 官方上游，只读取和作为变基基准 |
| `fork` | `https://github.com/EchoOtaku/tapp-store.git` | 个人 Fork，推送功能分支与同步 `main` |

不要交换两者含义。所有新分支必须从最新 `origin/main` 创建。

## 2. 启动工作前同步

```powershell
git status --short --branch
git fetch origin
git fetch fork
git rev-list --left-right --count origin/main...fork/main
```

`git rev-list` 输出格式为 `<仅 origin 的提交数> <仅 fork 的提交数>`：

- `0 0`：完全同步。
- `N 0`：Fork 落后，可纯快进同步。
- `0 N`：Fork 有额外提交，先判断是否误把功能提交放入 `main`。
- `N M`：双方分叉，不允许盲目强推，先人工审查。

只有确认 Fork 没有独有提交时才同步：

```powershell
git push fork origin/main:main
```

同步后必须再次执行 `git ls-remote --heads fork main`，确认远端 SHA 与 `git rev-parse origin/main` 相同。网络失败或没有明确成功输出时，一律视为未同步。

## 3. 创建工作分支

```powershell
git switch -c <type>-cn-echootaku-days-<topic> origin/main
```

建议命名：

- `feat-cn-echootaku-days-<topic>`
- `fix-cn-echootaku-days-<topic>`
- `docs-cn-echootaku-days-<topic>`

禁止直接在 `main` 开发，也不要继续复用已经合并的 PR 分支。

## 4. 开发边界

商店正式文件位于 `apps/cn.echootaku.days/`。本地 harness、测试包和截图必须放到系统临时目录，不得进入 Git。

修改时同步检查：

1. `manifest.json` 与 `index.json` 的 ID、版本、权限是否一致。
2. `download` 映射是否覆盖 Manifest 声明的 Page、Widget 和模板文件。
3. `main.js` 的共享 helper 是否位于 `Widget Code` / `Page Code` 标记之前。
4. Page 和 Widget 是否都能独立运行，不能依赖另一区段定义的函数。
5. 主题订阅、storage 订阅和 timer 是否在 `onDestroy` 清理。
6. 不依赖宿主必然注入 `.glass`；需要的 Glass CSS 必须由 Tapp 自己定义。

## 5. 版本与索引

遵循语义化版本：

- 修复：`0.1.0` → `0.1.1`
- 向后兼容功能：`0.1.1` → `0.2.0`
- 不兼容变化：进入稳定版本后提升主版本

更新时间统一使用 UTC ISO 8601：

```powershell
Get-Date -AsUTC -Format "yyyy-MM-ddTHH:mm:ssZ"
```

`index.json` 的应用 `size` 是 `download` 映射所引用文件的原始字节合计，不是 `.tapp` 压缩包大小，也不包含 preview、本地 harness 或未映射文件。每次修改下载文件后必须重新计算。

## 6. 本地校验

使用本机 `D:\SDK` 中已经存在的 Node.js，不私自下载运行时：

```powershell
$env:Path = 'D:\SDK\NodeJS\node-versions\v24.16.0\installation;D:\SDK\NodeJS\npm-global;' + $env:Path

node --check apps/cn.echootaku.days/main.js
node tapp-cli/bin/myriad-tapp.mjs check apps/cn.echootaku.days --json
node scripts/validate-previews.mjs
npm test --prefix tapp-cli
node tapp-cli/bin/myriad-tapp.mjs pack apps/cn.echootaku.days --out "$env:TEMP\cn.echootaku.days-<version>.tapp" --json
git diff --check
```

还需要在本地 Page harness 中完成：新建、编辑、删除、筛选、搜索、主题切换、空数据和 storage 更新回归。Widget 检查 2x2、4x2、4x4 三种尺寸。

## 7. 提交前再次跟进上游

```powershell
git fetch origin
git rebase origin/main
```

若 `index.json` 冲突：

1. 保留上游新增应用及其完整元数据。
2. 只重新应用本 Tapp 的版本、大小和更新时间。
3. 根目录版本和时间采用兼容且不倒退的值。
4. 用 `ConvertFrom-Json` 验证 JSON，并确认应用数量没有意外减少。
5. `git add index.json` 后执行 `git rebase --continue`。

禁止用整个旧版 `index.json` 覆盖最新上游文件。

## 8. Commit 与推送

只暂存约定文件：

```powershell
git status --short
git diff --stat
git add <明确的文件列表>
git commit -m "<type>(days): <summary>"
git push -u fork HEAD
```

常用类型：`feat`、`fix`、`docs`、`refactor`、`test`、`chore`。一次 PR 保持单一目标；不要提交 `.tapp`、`dist/`、临时 harness、IDE 配置或本机日志。

如果审阅期间因变基需要改写远端历史，只允许：

```powershell
git push --force-with-lease fork HEAD
```

不得使用普通 `--force`。

## 9. 创建与维护 PR

1. 使用 [PULL_REQUEST_TEMPLATE.md](./PULL_REQUEST_TEMPLATE.md) 填写正文。
2. Base 固定为 `Myriad-You/tapp-store:main`。
3. Head 使用 `EchoOtaku/tapp-store:<当前分支>`。
4. 创建后确认 changed files、commit 数和 base/head。
5. 审阅建议先验证是否成立，再修改；修改后重新跑完整校验。
6. 若代码或大小发生变化，同步更新 PR 正文中的实际数字。
7. GitHub 显示冲突时，重新 fetch/rebase；不能只根据缓存页面判断，最终确认 `mergeable` / `mergeable_state`。

## 10. 合并后的收尾

```powershell
git fetch origin
git switch main
git merge --ff-only origin/main
git push fork main
git branch -d <已合并分支>
git push fork --delete <已合并分支>
```

删除分支前确认 PR 已合并且提交已存在于 `origin/main`。随后更新 [STATUS.md](./STATUS.md)，记录发布版本、合并 PR、上游提交和验证日期。

## 11. 防落后检查清单

- 开始工作前 fetch 官方上游。
- 新分支从 `origin/main` 创建。
- 提交 PR 前再次 rebase。
- 审阅修改后再次检查上游。
- 合并后让本地 `main` 与 Fork `main` 都纯快进到官方 main。
- 所有同步操作都核对 SHA；没有明确成功证据就不声称完成。
