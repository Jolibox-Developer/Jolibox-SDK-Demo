const jolibox = new JoliboxSDK();
const { ads, runtime, task } = jolibox;

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
 * ==================== First Interaction Screen API ====================
 */
// OPTIONAL. When the player first reaches an interactive screen, call gameTTI to mark the Time To Interactive.
runtime.gameTTI();

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
    // You should not rely on this callback to determine whether the ad is ready to play.
    // Normally, if ads instance exists, it means that you are able to call adBreak to play the ad.
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
 * ==================== Task API ====================
 *
 * These APIs are optional to integrate but we STRONGLY recommend you to integrate them.
 * The task API is designed to help us track the player's progress in your game so that we can provide you with better rewards.
 * 
 * There are 5 APIs:
 * 1. onLevelStart - Send a level/checkpoint started event to the server.
 * 2. onLevelFinished - Send a level/checkpoint finished event to the server.
 * 3. onLevelFailed - Send a level/stage failed event to the server.
 * 4. onGamePlayEnded - Send a game play ended event to the server.
 * 5. onLevelUpgrade - Send a player upgrade event to the server.
 * 
 * For progress reporting, you can choose either onLevelFinished or onGamePlayEnded.
 */

// Emit a level/checkpoint started event to the server. Eg: user starts a level or a stage
//
// params: Required. object.
// params.levelId: Required. string or number. The levelId is a unique identifier for the level.
const levelStartButton = document.getElementById("level-started");
if (levelStartButton) {
  levelStartButton.addEventListener("click", async () => {
    const levelId = 1; // simulate level 1
    const response = await task.onLevelStart({
      levelId,
    });
    console.log("Level Start Response:", response);
  });
}

// Emit a level/checkpoint finished event to the server. Eg: user passes a level or a stage, like Candy Crush
//
// params: Required. object.
// params.levelId: Required. string or number. The levelId is a unique identifier for the level.
// params.duration: Optional. number. The duration of the level in milliseconds.
// params.rating: Optional. number. The rating of the level.
// params.score: Optional. number. The score of the level.
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

// Emit a level/stage failed event to the server. Eg: user fails a level or a stage
//
// params: Required. object.
// params.levelId: Required. string or number. The levelId is a unique identifier for the level.
// params.duration: Optional. number. The duration of the level in milliseconds.
// params.rating: Optional. number. The rating of the level.
// params.score: Optional. number. The score of the level.
const levelFailedButton = document.getElementById("level-failed");
if (levelFailedButton) {
  levelFailedButton.addEventListener("click", async () => {
    const levelId = 1; // simulate level 1
    const score = 100; // simulate 100 score
    const duration = 3000; // simulate 3 seconds
    const rating = 5; // simulate 5 stars rating
    const response = await task.onLevelFailed({
      levelId,
      duration,
      rating,
      score,
    });
    console.log("Level Failed Response:", response);
  });
}

// Emit a game play ended event to the server. Eg: user win/die or game over, like Tetris
//
// params: Required. object.
// params.score: Required. number. The score of the game.
// params.duration: Optional. number. The duration of the game in milliseconds.
// params.rating: Optional. number. The rating of the game.
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

// Emit a player upgrade event to the server.
//
// params: Required. object.
// params.levelId: Required. string or number. The levelId is a unique identifier for the player level.
// params.name: Optional. string. The name of the player level.
const levelUpgradeButton = document.getElementById("level-upgrade");
if (levelUpgradeButton) {
  levelUpgradeButton.addEventListener("click", async () => {
    const levelId = "2";
    const name = "Level 2 - Silver";
    const response = await task.onLevelUpgrade({ levelId, name });
    console.log("Level Upgrade Response:", response);
  });
}
