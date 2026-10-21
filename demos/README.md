# ASTECH Store demo library

One folder per showcase video. Each folder holds the demo script (shots plus
the exact voiceover lines) used to record that video, so any re-record stays
identical in structure.

| Folder | Shows | Status |
|---|---|---|
| browse-and-cart | Search, category filters, product detail, cart | Script ready, not recorded |

This is a React Native app rendered through react-native-web, so the take is
recorded at a phone viewport (430 by 932, touch enabled) and the silent
take is later composited into a 1920x1080 frame. At a desktop width the
React Native layout stretches and stops looking like a phone.

Recording recipe: the shared harness in `portfolio-v3/scripts/showcase/`,
which drives headed Chromium with a visible cursor, chapter marks and
audio-paced steps. Voice clips come from `gen_voice_clips.sh` (edge-tts
GuyNeural male voice), the narration is muxed on with
`make_timed_voiceover.sh`, and the poster is grabbed with
`make_posters.sh`.

Run one tour:

```bash
cd mobile-clones/astech-store-react-native

# 1. voice clips, the recorder reads durations.json to pace itself
../../portfolio-v3/scripts/showcase/gen_voice_clips.sh \
  scripts/test/voice-lines-browse-and-cart.txt /tmp/voice-as-store

# 2. record the silent phone take
BASE=https://www.amir-mhlli.com/projects/astech/index.html \
VOICE_DURS=/tmp/voice-as-store/durations.json \
node scripts/test/record-browse-and-cart.mjs

# 3. mux the narration on at the chapter timestamps
../../portfolio-v3/scripts/showcase/make_timed_voiceover.sh \
  demos/browse-and-cart/astech-store-browse-and-cart.mp4 \
  /tmp/showcase-as-store/chapters.json \
  demos/browse-and-cart/astech-store-browse-and-cart-voiced.mp4 \
  /tmp/voice-as-store

# 4. composite the phone footage into a 1920x1080 frame
../../portfolio-v3/scripts/showcase/make_phone_frame.py \
  demos/browse-and-cart/astech-store-browse-and-cart-voiced.mp4 \
  demos/browse-and-cart/astech-store-browse-and-cart-framed.mp4 \
  --title "ASTECH Store" \
  --stack "React Native 0.81 · Expo SDK 54 · Redux Toolkit" \
  --feature "Search and category filters" \
  --feature "Product detail with reviews" \
  --feature "Cart with quantity and totals"
```

The deployed build cannot reach the live product API, so the app falls back
to its bundled catalogue. The app logs that fallback itself, and the grid
still renders real products with real images, prices and ratings. The tour
does not claim the API is live.

Verified stack: Expo SDK 54, React Native 0.81, React 19, React Navigation
v7, Redux Toolkit with redux-thunk, AsyncStorage for persistence,
react-native-web for the browser build, react-native-vector-icons for the
header icons.
