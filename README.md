# Jolibox JS SDK Demo

This is a demo project for Jolibox JS SDK.

Once you run the project, you are expected to provide the following query parameters in the URL:

- `gameId`: A required string value to indicate the game ID you want to play. Use G31903729079412278950430008822 for testing.

- `testAdsMode`: A required boolean value to indicate if the game uses test mode ads.

- `joliboxEnv`: A required string value to indicate the Jolibox environment. Must be staging when doing testing.

---

这是一个 Jolibox JS SDK 的演示项目。

运行项目后，您需要在 URL 中提供以下查询参数：

- `gameId`：测试时必选。您想玩的游戏 ID。测试时使用 G31903729079412278950430008822。

- `testAdsMode`：测试时必选。一个布尔值，表示游戏是否使用测试模式的广告。

- `joliboxEnv`：测试时必选。一个字符串，表示 Jolibox 环境。在测试时必须为 staging。


## Usage

- Via CDN

  We strongly recommend using the CDN to integrate our SDK as it can support the latest features and bug fixes.

  我们强烈建议使用 CDN 来集成我们的 SDK，因为它可以支持最新的功能和错误修复。

  ```bash
  cd via-cdn
  npx serve .

  # visit http://localhost:3000?testAdsMode=true&gameId=G31903729079412278950430008822&joliboxEnv=staging
  ```

- Via NPM

  ```bash
  cd via-cdn
  npm install
  npm run dev

  # visit http://localhost:5173?testAdsMode=true&gameId=G31903729079412278950430008822&joliboxEnv=staging
  ```

## API Documentation

- [Jolibox JS SDK](https://sdk-docs.jolibox.com/)
- [Jolibox JS SDK (中文)](https://sdk-docs.jolibox.com/zh_cn/)

## Testing related

- [Test Cloud Storage API](./docs/test-storage.md)