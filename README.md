# 生日提醒系统（Cloudflare Workers）

一键部署的生日提醒系统，支持多用户、多通知渠道（企业微信等）、农历/阳历生日、批量导入。

## 快速部署

1. **Fork 本仓库**（或直接使用模板）

2. **创建 Cloudflare 资源**（在 Cloudflare 控制台操作）：
   - D1 数据库：命名为 `birthday-db`，记录其 ID
   - KV 命名空间：命名为 `NOTIFICATION_TOKENS`，记录其 ID
   - 生成 API Token（需要 Workers、D1、KV 读写权限）

3. **在 GitHub 仓库 Settings > Secrets and variables > Actions 添加以下 Secrets**：
   | Secret 名称 | 说明 |
   |-------------|------|
   | `CF_API_TOKEN` | Cloudflare API Token |
   | `CF_ACCOUNT_ID` | Cloudflare 账户 ID |
   | `D1_ID` | D1 数据库 ID |
   | `KV_ID` | KV 命名空间 ID |
   | `ADMIN_USERNAME` | (可选) 管理员用户名，若设置则自动创建管理员 |
   | `ADMIN_PASSWORD` | (可选) 管理员密码 |
   | `MULTI_USER` | (可选) 是否允许多用户注册，默认 false |

4. **推送代码到 main 分支**，GitHub Actions 自动部署。

5. **访问 Worker 域名**（如 `https://birthday-reminder.你的子域.workers.dev`），使用管理员账号登录，开始管理生日和通知渠道。

## 功能特性

- ✅ 支持阳历/农历生日，自动计算下一个生日
- ✅ 多用户隔离，JWT 认证
- ✅ 多种通知渠道（企业微信应用、机器人等，可扩展）
- ✅ 批量导入生日数据（CSV）
- ✅ 短信模板变量 + 外部 API 调用
- ✅ 定时任务每日自动提醒

## 扩展通知渠道

在“通知渠道”中添加渠道，类型选择 `wechat_app`，配置示例：
```json
{"corpid":"xxx","corpsecret":"xxx","agentid":"xxx"}