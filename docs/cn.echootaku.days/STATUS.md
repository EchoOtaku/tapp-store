# `cn.echootaku.days` 当前状态

> 快照时间：2026-08-04 17:55（Asia/Shanghai）。已同步检查官方 `origin/main`（`df181b0`）；本文件是维护快照，不代替商店 `index.json` 或 GitHub PR 的实时状态。

## 基本信息

| 项目 | 当前值 |
| --- | --- |
| Tapp ID | `cn.echootaku.days` |
| 名称 | 朝夕 |
| 作者 | EchoOtaku |
| 包名规则 | 域名 `echootaku.cn` 倒写 |
| 商店正式版本 | `0.1.1`，由 PR #52 合入 |
| 待发布版本 | `0.1.2`，由 PR #55 提交 |
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
- 快照状态：已合并。
- 目标版本：`0.1.1`。
- 主要修复：
  - 将 `daysSetText` 从 Widget 区段移动到共享 core，修复 Page 宿主初始化失败。
  - 编辑器不再依赖 `requestAnimationFrame` 才进入可见状态。
  - 显式查询和校验表单字段，补充删除按钮空值保护。
  - 新建与编辑已有卡片统一捕获编辑器打开异常。
  - 修正滚动条使用未定义 token 的问题。
  - 完善主题订阅和销毁清理。

### PR #55

- 地址：https://github.com/Myriad-You/tapp-store/pull/55
- 分支：`feat-cn-echootaku-days-glass`
- 最新维护提交：`b7dd945af3fcf2a648846b762e1d815c3b6853d6`
- 快照状态：Open。
- 目标版本：`0.1.2`。
- 主要内容：
  - 保存按钮改为显式事件处理，避免沙箱 iframe 阻止原生表单提交。
  - 新建与关闭编辑器增加淡入、位移、缩放和背景模糊动画。
  - 使用应用内分类弹层替代暗色模式下不可读的原生选择框。
  - 支持新增自定义分类，并通过独立 `days.categories.v1` key 持久化。
  - 日期控件、Page、Hero、筛选栏、卡片和编辑器统一为 Glass 视觉材质。

## 当前验证基线

| 检查 | 结果 |
| --- | --- |
| `tapp-cli` 测试 | 42 passed / 0 failed / 5 skipped |
| CLI diagnostics | 0 |
| Missing permissions | 0 |
| 静态预览 | 当前全仓校验被上游 `cn.wyyzxzyg.cdn-cache` 的既有错误路径阻断；朝夕预览未修改 |
| `.tapp` 包 | 8 entries，56,531 bytes |
| 商店下载文件合计 | 57,454 bytes |
| JavaScript 语法 | `node --check` 通过 |
| Diff 格式 | `git diff --check` 通过 |
| Page 端到端回归 | 新建、自定义分类、保存、Widget 同步、再编辑通过；无新增控制台错误 |

临时测试包位于系统临时目录，未进入 Git：

```text
C:\Users\Otaku\AppData\Local\Temp\cn.echootaku.days-0.1.2.tapp
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
- 预设与自定义分类、颜色和备注。
- 搜索与“全部 / 即将到来 / 已过单次”筛选。
- Page 最近事件 Hero。
- 三种 Widget 尺寸共享 storage。
- 浅色、深色主题和 Glass 视觉材质。
- 午夜自动更新 Widget 倒数。

## 待办与发布条件

1. 等待 PR #55 审阅与合并。
2. 根据审阅意见只修改朝夕应用和对应商店索引，不混入本机资源或其他 Tapp。
3. 合并后同步官方 `main` 与个人 Fork，并在真实 Myriad 环境升级到 `0.1.2`。
4. 复验沙箱保存、自定义分类持久化、日期控件以及亮/暗主题 Glass 表现。
5. 上游修正 `cn.wyyzxzyg.cdn-cache` 预览路径后，重新执行全仓静态预览校验。

## 状态更新规则

每次 PR 创建、审阅修改、合并或发布后更新：快照时间、版本、PR 状态、提交 SHA、验证数字、包大小和下一步。任何“实时”结论都必须通过 `git fetch`、GitHub PR 状态或商店实际运行重新确认。
