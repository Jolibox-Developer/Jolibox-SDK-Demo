# Progress and Growth Data Collection Specification

This document defines the data collection standards for **Level and Growth Progress** events in the Jolibox JS SDK.
The core objective is to accurately record the user's **irreversible progress** (e.g., levels, ranks, high scores) to support the analysis of retention rates, level difficulty, and growth pacing.

## 1. Core Principles

The data collected must be **irreversible data representing user growth progress**, and strictly prohibited from mixing with consumable resources.

*   **✅ Collection Targets (Progress)**: Level ID, High Score, Star Rating, Main City Level, Rank/Tier.
*   **❌ Excluded Targets (Assets)**: Gold, Diamonds, Stamina, Item Quantity.

| Good Example | Bad Example |
| :---: | :---: |
| <img src="good.png" width="400" /> | <img src="bad.png" width="400" /> |
| **Level 1** (Level) / **74,175** (Score) | **Gold 30** (Consumable Asset) |

## 2. Application Interaction Event Definitions

### 2.1 loadFinished (Game Load Complete)

This event is used to indicate "Game resources are ready, ready to play". Please choose the timing to call this based on whether the game has a **loading progress bar on the home screen**:

<img src="loadFinished.png" width="300" />

#### Case 1: No Home Screen Progress Bar

If the game enters the main interface directly after startup, please call this **immediately** after resources are loaded.

```javascript
runtime.loadFinished();
```

#### Case 2: Has Home Screen Progress Bar

If the game has a Loading interface, please call this after **the progress bar reaches 100% (loading complete)**.

```javascript
// 1. Sync progress during loading (Optional)
runtime.notifyLoadProgress(30);
runtime.notifyLoadProgress(60);
// ...

// 2. Call the completion signal immediately after loading is done
runtime.loadFinished();
```

### 2.2 gameTTI (First Time to Interactive)

This event records the time point when the game **first becomes interactive** (Time to Interactive).

*   **When to send**: When the user sees the main interface for the **first time** and **can click** any UI element (such as the Start button, Settings icon, etc.).
*   **Note**: Send only once, typically called immediately after the game starts and enters the home screen.

<img src="gameTTI.png" width="300" />

```javascript
// When the main interface is loaded and UI buttons respond to clicks
runtime.gameTTI();
```

## 3. In-Game Event Definitions

### 3.1 onLevelStart (Level Start)

Applicable to games with a level concept.

*   **When to send**: Triggered when the player clicks "Start" or formally enters a level.
*   **What to send**: The current level number starting.

<img src="level_start.png" width="300" />

```javascript
// E.g., clicked the Start button for Level 1
await task.onLevelStart({ 
    levelId: 1       // Required: Current level/layer 
});
```

### 3.2 onLevelFinished (Level Completed)

This event is mainly divided into two cases:

#### Case 1: Games with Level Concept (e.g., Puzzle, Match-3)

These games are usually played level by level.

*   **When to send**: Send only when **"Level Passed / Success"**.
*   **What to send**: Send the current passed level ID (levelId).
*   **Note**: Do **NOT** send if failed or quit halfway.

<img src="level_match3.png" width="800" />

```javascript
// E.g., just passed Level 1
await task.onLevelFinished({
    levelId: 1,     // Required: Current passed level ID
});
```

#### Case 2: Games with Score Concept (e.g., Runner, Endless Mode)

These games might display "Level", but the core is comparing scores or distance.

*   **When to send**: Send once every time a game **ends normally** (result panel appears).
*   **What to send**: Send the result of this round (score, distance, etc.).

<img src="level_runner.png" width="800" />

```javascript
// E.g., round ended and settlement shown
await task.onLevelFinished({
    levelId: 1,      // Required: Current level/layer
    score: 63600,    // Optional: Core score of this round (e.g., money/meters)
    rating: 3,       // Optional: Star rating
    duration: 120000 // Optional: Duration of this round (ms)
});
```

### 3.3 onLevelFailed (Level Failed)

Applicable to games with a level concept. Triggered when the player **fails** in a level (e.g., ran out of moves, died) and decides to give up or restart.

*   **When to send**: When the level failed result panel appears.
*   **What to send**: The current failed level ID, and (optional) current progress or score.

<img src="levelfailed.png" width="300" />

```javascript
await task.onLevelFailed({ 
    levelId: 1,        // Required: Current level/layer 
    score: 200,        // Optional: Core score of this round (e.g., money/meters) 
    rating: 0,         // Optional: Star rating 
    duration: 120000   // Optional: Duration of this round (ms) 
});
```

### 3.4 onGamePlayEnded (Round Ended)

Applicable to single-round loop games without a clear level structure (e.g., Jump, Runner, Endless Mode). Triggered whenever the result panel pops up, regardless of win or loss.

<img src="playend.png" width="413" />

#### Field Mapping

1.  **BEST WAVE 3 (score)**: Core score of this round, corresponding to "BEST WAVE 3" in the image.
2.  **Duration (duration)**: Survival time of this round (milliseconds).
3.  **Rating (rating)**: (Optional) Win/Loss status or rating grade.

#### Code Example

```javascript
await task.onGamePlayEnded({
    score: 3,          // Corresponds to BEST WAVE 3
    duration: 120000,  // Survival time (ms)
    rating: 1          // Result marker
});
```

### 3.5 onLevelUpgrade (Level Up)

Applicable to long-term growth content (e.g., RPG Level, Main City Level, Rank Promotion), or games **without explicit levels but with core unit levels** (e.g., highest cat level in merge games).

<img src="levelup.png" width="413" />

#### Collection Rules

*   **Scenario Example**: As shown in the image, the game has no level concept, but the player unlocked a new cat level (Level 3). In this case, report the **currently unlocked highest level**.
*   **Trigger Timing**: Triggered instantly upon upgrading/unlocking a new level.
*   **Deduplication**: Report only once for the same level (need to record the highest reported level locally).
*   **Monotonicity**: Record only upgrades, not downgrades or tier drops.

#### Code Example

```javascript
// When player unlocked Level 3 Cat
await task.onLevelUpgrade({
    levelId: 3,           // Newly unlocked highest level
    name: "Neozzarth"     // Level name / Character name (Optional)
});
```

## 4. FAQ

**Q: Should I report `onLevelFinished` when a level fails?**
> No. This event is only for recording "Pass" behavior. For failed data, please report the `onLevelFailed` event.

**Q: Should I report repeated challenges of already passed levels?**
> Yes. Any genuine pass behavior should be recorded to analyze user activity and willingness to replay.

**Q: Why can't I report Gold or Item quantities?**
> Gold is a volatile asset and cannot represent user growth progress. Mixing it into progress data will invalidate user segmentation logic.
