const jolibox = new JoliboxSDK();
const { ads, runtime, storage, task } = jolibox;

/**
 * ==================== Runtime API ====================
 */

// OPTIONAL. When your game is loading, call notifyLoadProgress to report the loading progress
// The progress value should be between 0 and 100.
runtime.notifyLoadProgress(30);
runtime.notifyLoadProgress(60);
runtime.notifyLoadProgress(90);

// REQUIRED. When your game is fully loaded, call loadFinished to notify the completion of loading.
runtime.loadFinished();

/**
 * ==================== Ads API ====================
 */

// REQUIRED. Initialize ads SDK, must be called before any other ads API.
ads.init();

// REQUIRED. Configure the ads settings and preload the ads (e.g., in the game loading screen)
ads.adConfig({
  preloadAdBreaks: "on",
  sound: "off",
  onReady: () => {
    console.log("onReady");
  },
});

// OPTIONAL. When the player clicks on the reward button, call adBreak to play a reward ad.
const adRewardButton = document.getElementById("ad-reward");
if (adRewardButton) {
  adRewardButton.addEventListener("click", () => {
    // Pop up the reward ad
    ads.adBreak({
      type: "reward",
      beforeReward(showAdFn) {
        // Do something before the ad is shown. e.g. pause game
        console.log("beforeReward");
        showAdFn();
      },
      adDismissed: () => {
        // You are informed that the ad has been closed by the user and did not meet the reward conditions
        console.log("adDismissed");
      },
      adViewed: () => {
        // You are informed that the ad has been viewed and met the reward conditions
        console.log("adViewed");
      },
      adBreakDone: (placementInfo) => {
        // Process remaining logic, whether to issue a reward and restore game state.
        console.log("adBreakDone", placementInfo);
        if (placementInfo.breakStatus === "viewed") {
          // Issue reward and restore game state
        } else {
          // Restore game state but do not issue a reward
        }
      },
    });
  });
}

// OPTIONAL. When you want to show an interstitial ad
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
 * ==================== Cloud Storage API ====================
 */

// OPTIONAL. When you want to set an item in the cloud storage
const setItemButton = document.getElementById("set-item");
if (setItemButton) {
  setItemButton.addEventListener("click", async () => {
    const result = await storage.setItem("score", 100);
    // If setting an item in the cloud storage is successful, result.code will return "SUCCESS".
    // If it fails, it will return other error codes. Regardless of success or failure, it will be stored in the local IndexedDB.
    console.log(result);
  });
}

// OPTIONAL. When you want to get an item from the cloud storage
const getItemButton = document.getElementById("get-item");
if (getItemButton) {
  getItemButton.addEventListener("click", async () => {
    const result = await storage.getItem("score");
    // If getting the item from the cloud storage is successful, result.code will return "SUCCESS".
    // If it fails, it will return other error codes, and it will fallback to the local IndexedDB.
    console.log(result);
  });
}

// OPTIONAL. When you want to remove an item from the cloud storage
const removeItemButton = document.getElementById("remove-item");
if (removeItemButton) {
  removeItemButton.addEventListener("click", async () => {
    const result = await storage.removeItem("score");
    // If the item is removed from the cloud storage successfully, result.code will return "SUCCESS". If it fails, it will return other error codes.
    // Regardless of success or failure, it will be deleted from the local IndexedDB.
    console.log(result);
  });
}

// OPTIONAL. When you want to clear all items from the cloud storage
const clearButton = document.getElementById("clear");
if (clearButton) {
  clearButton.addEventListener("click", async () => {
    const result = await storage.clear();
    // If the cloud storage is cleared successfully, result.code will return "SUCCESS". If it fails, it will return other error codes.
    // Regardless of success or failure, all data in the local IndexedDB will be cleared.
    console.log(result);
  });
}

/**
 * ==================== Task API ====================
 */

// OPTIONAL. Emit a level/checkpoint finished event to the server
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

// OPTIONAL. Emit a task finished event to the server
const taskFinishedButton = document.getElementById("task-finished");
if (taskFinishedButton) {
  taskFinishedButton.addEventListener("click", async () => {
    const taskId = "main-task-1";
    const duration = 2500; // simulate duration in seconds
    const response = await task.onTaskFinished(taskId, duration);
    console.log("Task Finished Response:", response);
  });
}

// OPTIONAL. Emit a task event to the server, can be used for any custom event related to a task.
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

// OPTIONAL. Emit a player level upgrade event to the server
const levelUpgradeButton = document.getElementById("level-upgrade");
if (levelUpgradeButton) {
  levelUpgradeButton.addEventListener("click", async () => {
    const levelId = "2";
    const name = "Level 2 Unlocked";
    const response = await task.onLevelUpgrade(levelId, name);
    console.log("Level Upgrade Response:", response);
  });
}
