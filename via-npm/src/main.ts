import { JoliboxSDK } from "@jolibox/sdk";

const jolibox = new JoliboxSDK();
const { ads, runtime, storage } = jolibox;

/**
 * ==================== 运行时API ====================
 */

// 当你的游戏正在加载时，调用notifyLoadProgress来通知加载进度
runtime.notifyLoadProgress(30);
runtime.notifyLoadProgress(60);
runtime.notifyLoadProgress(90);

// 当你的游戏加载完成时，调用loadFinished来通知加载完成
runtime.loadFinished();

/**
 * ==================== 广告API ====================
 */

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

const adRewardButton = document.getElementById("ad-reward");
if (adRewardButton) {
  adRewardButton.addEventListener("click", () => {
    // 在需要弹出奖励广告的地方
    ads.adBreak({
      type: "reward",
      beforeReward(showAdFn) {
        // 处理广告播放前的逻辑，例如暂停游戏
        console.log("beforeReward");
        showAdFn();
      },
      adDismissed: () => {
        // 被告知广告已被用户关闭，并且没有达到奖励条件
        console.log("adDismissed");
      },
      adViewed: () => {
        // 被告知广告已被用户观看，并且达到奖励条件
        console.log("adViewed");
      },
      adBreakDone: (placementInfo) => {
        // 处理剩余逻辑，是否发放奖励，并恢复游戏状态
        console.log("adBreakDone", placementInfo);
      },
    });
  });
}

// 加载横幅广告
const adBanner = document.getElementById("ad-banner")!;
ads.adUnit({
  el: adBanner,
  fullWidthResponsive: "true",
  style: "display: block; max-width: 560px; min-width: 100px; height: 50px;",
});

/**
 * ==================== 云端存储API ====================
 */

const setItemButton = document.getElementById("set-item");
if (setItemButton) {
  setItemButton.addEventListener("click", async () => {
    // 在需要存储数据的地方
    const result = await storage.setItem("score", 100);
    // 如果云端存储成功，result.code将返回"SUCCESS"，如果失败，将返回其他错误码。无论成功或失败，都会存储到本地IndexedDB中
    console.log(result);
  });
}

const getItemButton = document.getElementById("get-item");
if (getItemButton) {
  getItemButton.addEventListener("click", async () => {
    // 在需要获取数据的地方
    const result = await storage.getItem("score");
    // 如果云端获取数据成功，result.code将返回"SUCCESS"，如果失败，将返回其他错误码，并且获取方式将会fallback到本地IndexedDB
    console.log(result);
  });
}

const removeItemButton = document.getElementById("remove-item");
if (removeItemButton) {
  removeItemButton.addEventListener("click", async () => {
    // 在需要删除数据的地方
    const result = await storage.removeItem("score");
    // 如果云端删除成功，result.code将返回"SUCCESS"，如果失败，将返回其他错误码。无论成功或失败，都会删除本地IndexedDB中的数据
    console.log(result);
  });
}

const clearButton = document.getElementById("clear");
if (clearButton) {
  clearButton.addEventListener("click", async () => {
    // 在需要清空数据的地方
    const result = await storage.clear();
    // 如果云端清空成功，result.code将返回"SUCCESS"，如果失败，将返回其他错误码。无论成功或失败，都会清空本地IndexedDB中的数据
    console.log(result);
  });
}
