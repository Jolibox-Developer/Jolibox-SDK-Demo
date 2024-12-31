# Jolibox JS SDK Demo

This is a demo project for Jolibox JS SDK.

Once you run the project, you are expected to provide a `gameId` and `testMode` query parameters to the URL.

- `gameId`: The game ID you want to play. Use G31903729079412278950430008822 for testing.

- `testMode`: A boolean value to indicate whether the game is in test mode or not.

---

这是一个 Jolibox JS SDK 的演示项目。

运行项目后，您需要在 URL 中提供 `gameId` 和 `testMode` 查询参数。

- `gameId`：您想玩的游戏 ID。测试时使用 G31903729079412278950430008822。

- `testMode`：一个布尔值，表示游戏是否处于测试模式。

## Usage

- Via CDN

  ```bash
  cd via-cdn
  npx serve .

  # visit http://localhost:3000?testMode=true&gameId=G31903729079412278950430008822
  ```

- Via NPM

  ```bash
  cd via-cdn
  npm install
  npm run dev

  # visit http://localhost:5173?testMode=true&gameId=G31903729079412278950430008822
  ```
