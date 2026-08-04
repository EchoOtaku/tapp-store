# `cn.echootaku.days` 当前状态

> 快照时间：2026-08-04 16:09（Asia/Shanghai）。本文件是维护快照，不代替 `origin/main`、商店 `index.json` 或 GitHub PR 的实时状态。

## 基本信息

| 项目 | 当前值 |
| --- | --- |
| Tapp ID | `cn.echootaku.days` |
| 名称 | 朝夕 |
| 作者 | EchoOtaku |
| 包名规则 | 域名 `echootaku.cn` 倒写 |
| 商店正式版本 | `0.1.0`，由 PR #49 合入 |
| 待发布版本 | `0.1.1`，由 PR #52 提交 |
| 最低 Myriad 版本 | `0.3.23` |
| 页面 | 支持 |
| Widget | 2x2、4x2、4x4 |
| 数据位置 | `Tapp.storage` 用户私有存储 |

## Pull Request 状态

### PR #49

- 地址：https://github.com/Myriad-You/tapp-store/pull/49
- 状态：已合并。
- 内容：首次加入朝夕 `0.1.0`。
- 注意：PR 合并后继续推送原分支不会更新已合并内容。

### PR #52

- 地址：https://github.com/Myriad-You/tapp-store/pull/52
- 分支：`fix-cn-echootaku-days-editor`
- 最新维护提交：`89c06b2eeed4fd62686ce9ded765008a85a3c325`
- 快照状态：Open，1 commit，4 changed files，`mergeable=true`，`mergeable_state=clean`。
- 目标版本：`0.1.1`。
- 主要修复：
  - 将 `daysSetText` 从 Widget 区段移动到共享 core，修复 Page 宿主初始化失败。
  - 编辑器不再依赖 `requestAnimationFrame` 才进入可见状态。
  - 显式查询和校验表单字段，补充删除按钮空值保护。
  - 新建与编辑已有卡片统一捕获编辑器打开异常。
  - 修正滚动条使用未定义 token 的问题。
  - 完善主题订阅和销毁清理。

## 当前验证基线

| 检查 | 结果 |
| --- | --- |
| `tapp-cli` 测试 | 42 passed / 0 failed / 5 skipped |
| CLI diagnostics | 0 |
| Missing permissions | 0 |
| 静态预览 | 8 passed |
| `.tapp` 包 | 8 entries，42,905 bytes |
| 商店下载文件合计 | 43,725 bytes |
| JavaScript 语法 | `node --check` 通过 |
| Diff 格式 | `git diff --check` 通过 |
| Page 新建编辑器 | 本地回归可见，包含 `is-open` |

临时测试包位于系统临时目录，未进入 Git：

```text
C:\Users\Otaku\AppData\Local\Temp\cn.echootaku.days-0.1.1.tapp
```

## 当前权限

| 权限 | 用途 |
| --- | --- |
| `storage` | 保存倒数日与纪念日 |
| `ui:notification` | 保存及错误提示 |
| `ui:theme` | 跟随宿主主题 |
| `ui:confirm` | 删除前确认 |
| `widget:register` | 注册 Widget |

## 功能状态

- 新建、编辑、删除倒数日。
- 单次日期与每年重复日期。
- 分类、颜色和备注。
- 搜索与“全部 / 即将到来 / 已过单次”筛选。
- Page 最近事件 Hero。
- 三种 Widget 尺寸共享 storage。
- 浅色和深色主题。
- 午夜自动更新 Widget 倒数。

## 待办与发布条件

1. 等待 PR #52 合并。
2. 合并后同步官方 `main` 到本地与个人 Fork。
3. 在真实 Myriad 环境升级到 `0.1.1`，复验新建、编辑和 storage 持久化。
4. 确认商店缓存刷新后线上不再出现 `daysSetText is not defined`。
5. 若继续 Glass 视觉优化，单独创建新的 UI PR，不混入运行时修复。

## 状态更新规则

每次 PR 创建、审阅修改、合并或发布后更新：快照时间、版本、PR 状态、提交 SHA、验证数字、包大小和下一步。任何“实时”结论都必须通过 `git fetch`、GitHub PR 状态或商店实际运行重新确认。
