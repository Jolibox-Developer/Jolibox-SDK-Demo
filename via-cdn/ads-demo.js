const jolibox = new JoliboxSDK({
  loaderConfig: {
    loaderMetadata: {
      version: '1.0.4-beta.1',
      asyncScriptUrl: 'https://cdn.jsdelivr.net/npm/@jolibox/web-async-sdk@1.0.4-beta.1/dist/index.iife.js',
      syncScriptUrl: 'https://cdn.jsdelivr.net/npm/@jolibox/web-sync-sdk@1.0.4-beta.1/dist/index.iife.js',
    }
  }
});
const { ads } = jolibox;
ads.init();

// 在需要预加载广告的地方（例如在游戏加载屏幕中）
ads.adConfig({
  preloadAdBreaks: "on",
  sound: "off",
  onReady: () => {
    console.log("onReady");
  },
});

window.showAdBreak = () => {
  // 在需要弹出奖励广告的地方
  ads.adBreak({
    type: "reward",
    beforeReward(showAdFn) {
      showAdFn();
    },
    adDismissed: () => {
      console.log("adDismissed");
    },
    adViewed: () => {
      console.log("adViewed");
    },
    adBreakDone: () => {
      console.log("adBreakDone");
    },
  });
};
