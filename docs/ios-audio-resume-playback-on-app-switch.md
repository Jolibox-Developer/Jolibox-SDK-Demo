# HTML5 Audio on iOS: Playback Not Resuming After App Switch (User Guide)

This guide targets users integrating web audio (Web Audio/HTMLAudio) and helps fix a common issue on iOS where audio does not resume after switching to another app and returning. The content renders well in a GitHub knowledge base.

## Overview
- Scenario: On iPhone/iPad Safari or an in‑app WKWebView, audio is playing. After switching to another app and returning, audio is silent or requires another tap to resume.
- Essence: When the page becomes hidden or audio focus changes, iOS/WebKit may suspend or interrupt the WebAudio AudioContext/media playback. Returning often requires a user gesture or explicit recovery.

## Terminology
- AudioContext: The audio processing context of the Web Audio API.
- visibilitychange: Page visibility change event.

## Scope
- Web: Safari, iOS Chrome (WebKit engine), H5 pages inside WKWebView.
- Audio methods: Web Audio API (AudioContext), HTMLAudioElement (audio tag).

## Symptoms & Causes
- Symptoms
  - After returning, the UI shows “playing” but no sound is heard.
  - Calling play() does not throw but audio remains silent.
  - WebAudio AudioContext.state becomes suspended or interrupted.
- Causes
  - When the page goes background, WebKit pauses the audio pipeline; you need to recover on foreground.
  - iOS auto‑play policy requires user interaction; recovery generally needs a user gesture.
  - Visibility change, audio routing change, device mute switch and more can affect playback.

## Quick Fix (Copy‑Paste)
On return and user interaction, detect and resume the AudioContext; also listen to visibility changes and attempt recovery when the page becomes visible.

```javascript
function resumeIfNeeded() {
  setTimeout(() => {
    if (context && (context.state === "suspended" || context.state === "interrupted")) {
      context.resume()
        .then(function () {
          console.log("[audio-fix] AudioContext resumed");
        })
        .catch(function (e) {
          console.warn("[audio-fix] Resume failed:", e);
        });
    }
  }, 250);
}

document.addEventListener("touchstart", resumeIfNeeded);
document.addEventListener("mousedown", resumeIfNeeded);
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    resumeIfNeeded();
  }
});
```

Notes:
- Place this logic early in page initialization, and ensure `context` points to your global/persistent AudioContext instance.
- A 250ms delay avoids transient states and WebView recovery jitter during visibility transition.

## Common Pitfalls
- Device mute and volume: The side mute switch or zero volume causes “appears playing but silent”.
- Multiple AudioContexts: Too many instances may be throttled or interfere; prefer a singleton.
- Auto‑play policy: iOS requires user gestures; avoid play() without interaction.
- Timer and recovery timing: Resuming immediately upon visibility change may be unstable; use a short delay.

## Troubleshooting Checklist
- After returning, is `context.state` running? If suspended/interrupted, did you trigger `resume()`?
- Are `touchstart/mousedown` handlers bound to perform recovery?
- When `document.visibilityState` becomes visible, do you resume?
- Is HTMLAudio `play()` called within a user gesture and not blocked by policy?
- Check device mute/volume, Bluetooth headset/audio routing anomalies.

## References
- Apple/WebKit notes on auto‑play policy and community experience
- Empirical approach: resume AudioContext and HTMLAudio on user interaction and page visible


