# Tapp Pull Request 模板

复制下面模板到 Pull Request 正文，并删除不适用的说明。标题使用 Conventional Commits，例如：

```text
feat(days): add recurring event reminders
fix(days): restore editor in host runtime
docs(days): document release workflow
```

---

```markdown
# <Tapp 名称与版本：本次变更摘要>

## 背景 / 问题

<!-- 说明用户可见的问题、复现环境与错误信息。修复类 PR 应写清根因。 -->

- Tapp ID：`cn.echootaku.days`
- 影响版本：`<version>`
- 运行环境：`<Myriad 版本 / Page / Widget / 主题>`
- 关联 PR 或 Issue：`<#编号或链接>`

```text
<必要且经过脱敏的错误信息；没有则删除本代码块>
```

## 变更内容

- <变更一>
- <变更二>
- <版本、索引或兼容性变化>

## 权限

<!-- 权限没有变化也必须明确说明。 -->

| 权限 | 用途 | 变化 |
| --- | --- | --- |
| `storage` | 保存用户数据 | 无变化 |
| `<permission>` | `<用途>` | `<新增 / 删除 / 无变化>` |

## 商店元数据

- Manifest 版本：`<x.y.z>`
- `index.json` 版本：`<x.y.z>`
- 商店目录版本：`<x.y.z>`
- `download` 文件合计：`<bytes>` bytes
- `.tapp` 包：`<entries>` entries，`<bytes>` bytes
- `updated_at` / `last_updated`：`<ISO 8601 UTC>`

## 验证

- [ ] `node --check apps/cn.echootaku.days/main.js`
- [ ] `myriad-tapp check`：0 diagnostics，0 missing permissions
- [ ] `npm test`：`<passed>` passed / 0 failed / `<skipped>` skipped
- [ ] `node scripts/validate-previews.mjs`
- [ ] `myriad-tapp pack` 成功，产物未提交
- [ ] Page 实际交互回归通过
- [ ] 2x2、4x2、4x4 Widget 回归通过
- [ ] 浅色、深色与窄屏布局检查通过
- [ ] `git diff --check` 通过

## 变更范围

<!-- 列出全部文件，说明为何修改；不要混入本机测试文件或构建产物。 -->

- `apps/cn.echootaku.days/<file>`：<原因>
- `index.json`：<版本、时间、大小等>

## 兼容性与风险

- 最低 Myriad 版本：`<minSystemVersion>`
- 数据迁移：`<无 / 说明迁移方式>`
- 已知限制：`<无 / 说明>`
- 回滚方式：`<恢复到哪个版本或提交>`

## 截图 / 录屏

<!-- UI 有变化时必须提供；纯逻辑修复可写“不适用”。 -->

## 提交前确认

- [ ] 分支基于最新 `origin/main`
- [ ] PR 只包含当前 Tapp 和必要的 `index.json` 变更
- [ ] `manifest.json` 与 `index.json` 的 ID、版本、权限一致
- [ ] `index.json` 保留上游新加入的其他应用和元数据
- [ ] 没有提交测试 harness、`.tapp`、`dist/`、日志或本机配置
- [ ] Commit 使用 Conventional Commits
```

## 写作要求

1. 先写可观察到的问题，再写实现手段。
2. 修复类 PR 必须给出根因，不能只写“优化代码”。
3. 校验结果写实际数字，不写笼统的“测试通过”。
4. `size` 同时区分商店下载文件合计与 `.tapp` 压缩包大小。
5. 审阅意见修复后更新正文数据，并逐条回复已处理内容。
