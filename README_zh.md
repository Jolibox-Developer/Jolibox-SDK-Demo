# Jolibox JS SDK 演示项目

这是一个 Jolibox JS SDK 的演示项目。

运行项目后，您需要在 URL 中提供以下查询参数：

- `gameId`：测试时必选。您想玩的游戏 ID。测试时使用 G31903729079412278950430008822。

- `testAdsMode`：测试时必选。一个布尔值，表示游戏是否使用测试模式的广告。

- `joliboxEnv`：测试时必选。一个字符串，表示 Jolibox 环境。在测试时必须为 staging。

## 用法

我们强烈建议使用 CDN 来集成我们的 SDK，因为它可以支持最新的功能和错误修复。

```bash
cd via-cdn
npx serve .

# 访问 http://localhost:3000?testAdsMode=true&gameId=G31903729079412278950430008822&joliboxEnv=staging
```

## API 文档

- [Jolibox JS SDK](https://sdk-docs.jolibox.com/)
- [Jolibox JS SDK (中文)](https://sdk-docs.jolibox.com/zh_cn/)
