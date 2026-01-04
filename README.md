# Jolibox JS SDK Demo

[中文文档](./README_zh.md)

This is a demo project for Jolibox JS SDK.

Once you run the project, you are expected to provide the following query parameters in the URL:

- `gameId`: A required string value to indicate the game ID you want to play. Use G31903729079412278950430008822 for testing.

- `testAdsMode`: A required boolean value to indicate if the game uses test mode ads.

- `joliboxEnv`: A required string value to indicate the Jolibox environment. Must be staging when doing testing.

## Usage

We strongly recommend using the CDN to integrate our SDK as it can support the latest features and bug fixes.

```bash
cd via-cdn
npx serve .

# visit http://localhost:3000?testAdsMode=true&gameId=G31903729079412278950430008822&joliboxEnv=staging
```

## API Documentation

- [Jolibox JS SDK](https://sdk-docs.jolibox.com/)

## Quick Demo Usage

- SDK initialization

```js
const jolibox = new JoliboxSDK();
const { ads, runtime, task } = jolibox;
```

- Ads initialization

```js
ads.init();
// At places where you need to preload ads (e.g., on the game loading screen)
ads.adConfig({
  preloadAdBreaks: "on",
  sound: "off",
  onReady: () => {
    console.log("Ads init onReady");
  },
});
```

- Interstitial ads

```js
ads.adBreak && ads.adBreak({
  type: "start",
  adBreakDone: () => {
    // success callback
  },
});
```

- Rewarded video ads

```js
ads.adBreak && ads.adBreak({
  type: "reward",
  beforeReward(showAdFn) {
    // Logic before playing the ad, e.g., pause the game
    console.log("beforeReward");
    showAdFn();
  },
  adDismissed: () => {
    // Notified that the ad was closed by the user without meeting reward conditions
    console.log("adDismissed");
    // failure handling
  },
  adViewed: () => {
    // Notified that the ad was watched and met reward conditions
    console.log("adViewed");
    // success handling
  },
  adBreakDone: (placementInfo) => {
    // Handle remaining logic: whether to grant rewards, and resume game state
    console.log("adBreakDone", placementInfo);
    if (placementInfo.breakStatus !== "viewed") {
      // failure handling
    }
  },
});
```

## Important Tracking Events

1. loadFinished event
   - A. If the game does not have a home screen progress bar, call:
     
     ```js
     runtime.loadFinished();
     ```
     
   - B. If the game has a home screen loading progress bar:
     - Sync with the progress
       
       ```js
       runtime.notifyLoadProgress(30);
       runtime.notifyLoadProgress(60);
       // ...
       runtime.notifyLoadProgress(90);
       ```
     
     - After the progress completes, call:
       
       ```js
       runtime.loadFinished();
       ```

2. First interaction screen event
```js

```

3. onLevelFinished event

```js
// The user passes a level or stage, similar to Candy Crush
// levelId: required. string or number. A unique identifier for the level.
// duration: optional. number. Time spent in the level in milliseconds.
// rating: optional. number. The rating of the level, e.g., 3 stars.
// score: optional. number. The score of the level.
const levelId = this.levelId;
const score = this.score;
const response = await task.onLevelFinished({
  levelId,
  duration,
  rating,
  score,
});
```

4. onGamePlayEnded event

```js
// The user wins/dies or the game ends, similar to WeChat Jump Jump
// score: required. number. The game score.
// duration: optional. number. Duration of gameplay in milliseconds.
// rating: optional. number. Game rating, e.g., 5 stars.
const score = 100;
const duration = 3000; // simulate 3 seconds
const rating = 5;
const response = await task.onGamePlayEnded({
  score,
  duration,
  rating,
});
```

5. onLevelUpgrade event

```js
// Level or player rank upgrade
// levelId: required. string or number. A unique identifier for the level/rank.
// name: optional. string. The name of the level/rank.
const levelId = "2";
const name = "Level 2 - Silver";
const response = await task.onLevelUpgrade({
  levelId,
  name,
});
```

## Common Issues

- iOS audio resume after app switch: See [iOS Audio Resume Playback on App Switch](./ios-audio-resume-playback-on-app-switch.md).
