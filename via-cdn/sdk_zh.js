const jolibox = new JoliboxSDK();
const { ads, runtime, storage, task } = jolibox;

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

// 加载横幅广告
const adBanner = document.getElementById("ad-banner");
ads.adUnit({
  el: adBanner,
  fullWidthResponsive: "true",
  style: "display: block; max-width: 560px; min-width: 100px; height: 50px;",
});

/**
 * ==================== 云端存储API ====================
 * 下列API推荐接入
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

/**
 * ==================== 任务API ====================
 * 下列API为可选接入
 */

// 关卡完成事件
const levelFinishedButton = document.getElementById("level-finished");
if (levelFinishedButton) {
  levelFinishedButton.addEventListener("click", async () => {
    const levelId = "1";
    const result = true;
    const duration = 3000; // 模拟耗时3秒
    const response = await task.onLevelFinished(levelId, result, duration);
    console.log("Level Finished Response:", response);
  });
}

// 任务完成事件
const taskFinishedButton = document.getElementById("task-finished");
if (taskFinishedButton) {
  taskFinishedButton.addEventListener("click", async () => {
    const taskId = "main-task-1";
    const duration = 2500; // 模拟耗时2.5秒
    const response = await task.onTaskFinished(taskId, duration);
    console.log("Task Finished Response:", response);
  });
}

// 任务事件
const taskEventButton = document.getElementById("task-event");
if (taskEventButton) {
  taskEventButton.addEventListener("click", async () => {
    const taskId = "main-task-1";
    const params = {
      tools: [
        {
          id: "1",
          name: "Tool A",
          count: 5,
          description: "Basic tool for gameplay",
          price: {
            amount: 9.99,
            unit: "$",
          },
        },
      ],
      awards: [
        {
          id: "1",
          name: "Bronze Medal",
        },
      ],
    };
    const response = await task.onTaskEvent(taskId, params);
    console.log("Task Event Response:", response);
  });
}

// 等级升级事件
const levelUpgradeButton = document.getElementById("level-upgrade");
if (levelUpgradeButton) {
  levelUpgradeButton.addEventListener("click", async () => {
    const levelId = "2";
    const name = "Level 2 Unlocked";
    const response = await task.onLevelUpgrade(levelId, name);
    console.log("Level Upgrade Response:", response);
  });
}
