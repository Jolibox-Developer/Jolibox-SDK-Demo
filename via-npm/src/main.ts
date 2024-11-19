import { JoliboxSDK } from "@jolibox/sdk";

const jolibox = new JoliboxSDK();
const { ads, runtime } = jolibox;

// 当你的游戏正在加载时，调用notifyLoadProgress来通知加载进度
runtime.notifyLoadProgress(30);
runtime.notifyLoadProgress(60);
runtime.notifyLoadProgress(90);

// 当你的游戏加载完成时，调用loadFinished来通知加载完成
runtime.loadFinished();

// 在游戏中初始化广告
ads.init();

// 在需要预加载广告的地方（例如在游戏加载屏幕中）
ads.adConfig({
  preloadAdBreaks: "on",
  sound: "off",
  onReady: () => {
    console.log("onReady");
  },
});

const button = document.getElementById("ad-reward");
if (button) {
  button.addEventListener("click", () => {
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
  });
}
