const jolibox = new JoliboxSDK();
const { ads, runtime, task } = jolibox;

/**
 * ==================== 运行时API ====================
 * 下列API为必选接入
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
    // 你不应该依赖此回调来确定广告是否准备就绪。
    // 通常，如果ads实例存在，则表示 adBreak 的调用已准备就绪。
    console.log("onReady");
  },
});

// 在需要弹出奖励广告的地方
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
        if (placementInfo.breakStatus === "viewed") {
          // 发放奖励并恢复游戏状态
        } else {
          // 恢复游戏状态但不发放奖励
        }
      },
    });
  });
}

// 在需要弹出插屏广告的地方
const adInterstitial = document.getElementById("ad-interstitial");
if (adInterstitial) {
  adInterstitial.addEventListener("click", () => {
    ads.adBreak({
      type: "start",
      adBreakDone: (placementInfo) => {
        console.log("adBreakDone", placementInfo);
      },
    });
  });
}

/**
 * ==================== Task API ====================
 *
 * Task API 都是可选接入的，我们强烈建议你接入。
 * Task API 旨在帮助我们跟踪玩家在游戏中的进度，以便我们可以为您提供更好的回报。
 * 
 * 任务API包括以下方法：
 * 1. onLevelFinished - 向服务器发送关卡/阶段完成事件
 * 2. onGamePlayEnded - 向服务器发送游戏结束事件
 * 3. onLevelUpgrade - 向服务器发送玩家升级事件
 * 
 * 1 和 2 方法只需要选一种接入即可
 */

// 向服务器发送关卡/阶段完成事件。例如：用户通过关卡或阶段，类似Candy Crush
//
// 参数：必选。object。
// 参数 levelId: 必选。string 或 number。levelId 是关卡的唯一标识符。
// 参数 duration: 可选。number。用户在关卡中的持续时间，以毫秒为单位。
// 参数 rating: 可选。number。关卡的评分或者评级，例如3星级。
// 参数 score: 可选。number。关卡的分数。
const levelFinishedButton = document.getElementById("level-finished");
if (levelFinishedButton) {
  levelFinishedButton.addEventListener("click", async () => {
    const levelId = 1; // simulate level 1
    const score = 100; // simulate 100 score
    const duration = 3000; // simulate 3 seconds
    const rating = 5; // simulate 5 stars rating
    const response = await task.onLevelFinished({
      levelId,
      duration,
      rating,
      score,
    });
    console.log("Level Finished Response:", response);
  });
}

// 向服务器发送游戏结束事件。例如：用户胜利/死亡或游戏结束，类似微信跳一跳
//
// 参数：必选。object。
// 参数 score: 必选。number。游戏的分数。
// 参数 duration: 可选。number。游戏的持续时间，以毫秒为单位。
// 参数 rating: 可选。number。游戏的评分或评级，例如3星级。
const gamePlayEndedButton = document.getElementById("game-play-ended");
if (gamePlayEndedButton) {
  gamePlayEndedButton.addEventListener("click", async () => {
    const score = 100;
    const duration = 3000; // simulate 3 seconds
    const rating = 5;
    const response = await task.onGamePlayEnded({
      score,
      duration,
      rating,
    });
    console.log("Game Ended Response:", response);
  });
}

// 向服务器发送玩家升级事件。
//
// 参数：必选。object。
// 参数 levelId: 必选。string 或 number。levelId 是关卡的唯一标识符。
// 参数 name: 可选。string。关卡的名称。
const levelUpgradeButton = document.getElementById("level-upgrade");
if (levelUpgradeButton) {
  levelUpgradeButton.addEventListener("click", async () => {
    const levelId = "2";
    const name = "Level 2 Unlocked";
    const response = await task.onLevelUpgrade({ levelId, name });
    console.log("Level Upgrade Response:", response);
  });
}
