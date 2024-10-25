import { JoliboxSDK } from "@jolibox/sdk";

const jolibox = new JoliboxSDK();
const { ads } = jolibox;
ads.init();

// 在需要预加载广告的地方（例如在游戏加载屏幕中）
ads.adConfig({
  preloadAdBreaks: "on",
  sound: "on",
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
