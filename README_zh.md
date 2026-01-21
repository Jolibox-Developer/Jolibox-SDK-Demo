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

## 快速DEMO使用 

- `Sdk初始化`
```js
const jolibox = new JoliboxSDK();
const { ads, runtime, task } = jolibox;
```
 
- `广告初始化`
```js
 ads.init();
 // 在需要预加载广告的地方（例如在游戏加载屏幕中）
 ads.adConfig({
    preloadAdBreaks: "on",
    sound: "off",
    onReady: () => {
       console.log("广告初始化 onReady");
    },
 });
```

- `插屏广告`
```js
 ads.adBreak && ads.adBreak({
    type: "start",
    adBreakDone: () => {
       //返回成功
    },
 });
```

- `激励视频广告`
```js
 ads.adBreak && ads.adBreak({
    type: "reward",
    beforeReward(showAdFn) {
        // 处理广告播放前的逻辑，例如暂停游戏
        console.log("beforeReward"); 
        showAdFn();     
    },
    adDismissed: () => {
        // 被告知广告已被用户关闭，并且没有达到奖励条件
        console.log("adDismissed");
        //失败处理       
    },
    adViewed: () => {
        // 被告知广告已被用户观看，并且达到奖励条件
        console.log("adViewed");
        //成功处理
    },
    adBreakDone: (placementInfo) => {
         // 处理剩余逻辑，是否发放奖励，并恢复游戏状态
         console.log("adBreakDone", placementInfo);
         if (placementInfo.breakStatus !== "viewed") {
            //失败处理
         }
     },
   });
```

## 重要的打点事件 

更多详尽的图文说明请参考：[进度与成长数据采集规范](./docs/OPSEM_zh.md)。

1）游戏加载完loadFinished打点说明
 
 A.当游戏没有首页进度条的时候，请直接调用 
 ```js
 runtime.loadFinished();
 ```
 B.当游戏有首页加载进度条的时候：
 - 同步使用进度条进度
 ```js
 runtime.notifyLoadProgress(30);
 runtime.notifyLoadProgress(60);
 ....
 runtime.notifyLoadProgress(90);
 ```
 - 在进度条`加载完毕`之后调用
 ```js
 runtime.loadFinished();
 ```
 
2）首次交互屏打点说明 
 ```js
 runtime.gameTTI();
 ```

3）通过关卡或阶段打点onLevelStart说明
 ```js
  // 用户开始关卡或阶段
  // 参数 levelId: 必选。string 或 number。levelId 是关卡的唯一标识符。
  const levelId = this.levelId;
  const response = await task.onLevelStart({
       levelId
  }); 
 ```

4）通过关卡或阶段打点onLevelFinished说明
 ```js
  // 用户通过关卡或阶段，类似Candy Crush
  // 参数 levelId: 必选。string 或 number。levelId 是关卡的唯一标识符。
  // 参数 duration: 可选。number。用户在关卡中的持续时间，以毫秒为单位。
  // 参数 rating: 可选。number。关卡的评分或者评级，例如3星级。
  // 参数 score: 可选。number。关卡的分数。
  const levelId = this.levelId;
  const score = this.score;
  const response = await task.onLevelFinished({
       levelId,
       duration,
       rating,
       score
  }); 
 ```

5）关卡/阶段失败打点 onLevelFailed 说明
 ```js
  // 用户在关卡/阶段挑战失败
  // 参数 levelId: 必选。string 或 number。levelId 是关卡的唯一标识符。
  // 参数 duration: 可选。number。用户在关卡中的持续时间，以毫秒为单位。
  // 参数 rating: 可选。number。关卡的评分或者评级，例如3星级。
  // 参数 score: 可选。number。关卡的分数。
  const levelId = this.levelId;
  const score = this.score;
  const response = await task.onLevelFailed({
       levelId,
       duration,
       rating,
       score
  });
 ```

6）结束游戏打点onGamePlayEnded说明
 ```js
 // 用户胜利/死亡或游戏结束，类似微信跳一跳
 // 参数 score: 必选。number。游戏的分数。
 // 参数 duration: 可选。number。游戏的持续时间，以毫秒为单位。
 // 参数 rating: 可选。number。游戏的评分或评级，例如3星级。
 const score = 100;
 const duration = 3000; // simulate 3 seconds
 const rating = 5;
 const response = await task.onGamePlayEnded({
      score,
      duration,
      rating,
 });
 ```
    
7）关卡或者玩家等级升级onLevelUpgrade说明
 ```js
 // 关卡或者玩家等级升级
 // 参数 levelId: 必选。string 或 number。levelId 是等级的唯一标识符。
 // 参数 name: 可选。string。等级的名称。
 const levelId = "2";
 const name = "Level 2 - Silver";
 const response = await task.onLevelUpgrade({
      levelId,
      name,
 });
 ```

## 常见问题汇总

- iOS 声音适配解决方案：请参考 [iOS 切换应用返回后，音频无法播放问题（使用者指南）](./ios-audio-resume-playback-on-app-switch_zh.md)。

