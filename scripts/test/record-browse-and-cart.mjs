// ASTECH Store mobile showcase tour: browse, filter, product detail and
// the cart.
//
// This is a React Native app rendered through react-native-web, so the
// take is recorded at a phone viewport, 430 by 932, with touch enabled.
// The silent take is later composited into a 1920x1080 frame with
// make_phone_frame.py.
//
// Run:
//   1. voice clips
//      ../../../../portfolio-v3/scripts/showcase/gen_voice_clips.sh \
//        scripts/test/voice-lines-browse-and-cart.txt /tmp/voice-as-store
//   2. record
//      BASE=https://www.amir-mhlli.com/projects/astech/index.html \
//      VOICE_DURS=/tmp/voice-as-store/durations.json \
//      node scripts/test/record-browse-and-cart.mjs
//   3. frame it
//      ../../../../portfolio-v3/scripts/showcase/make_phone_frame.py \
//        demos/browse-and-cart/astech-store-browse-and-cart-voiced.mp4 \
//        demos/browse-and-cart/astech-store-browse-and-cart-framed.mp4 \
//        --title "ASTECH Store" \
//        --stack "React Native 0.81 · Expo SDK 54 · Redux Toolkit" \
//        --feature "Search and category filters" \
//        --feature "Product detail with reviews" \
//        --feature "Cart with quantity and totals"

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(HERE, "..", "..");
const KIT = path.resolve(PROJECT, "..", "..", "portfolio-v3", "scripts", "showcase");

const {
  launchTour,
  humanClick,
  humanGoto,
  loadVoiceDurs,
  showEndCard,
  sleep,
} = await import(pathToFileURL(path.join(KIT, "harness.mjs")).href);

const BASE = (
  process.env.BASE || "https://www.amir-mhlli.com/projects/astech/index.html"
).replace(/\/+$/, "");
const TOUR = "as-store";
const OUT_MP4 = path.join(
  PROJECT,
  "demos",
  "browse-and-cart",
  "astech-store-browse-and-cart.mp4",
);

const VOICE_DURS = loadVoiceDurs(
  process.env.VOICE_DURS || "/tmp/voice-as-store/durations.json",
);

async function main() {
  const tour = await launchTour({
    slug: TOUR,
    base: BASE,
    viewport: { width: 430, height: 932 },
    voiceDurs: VOICE_DURS,
    title: {
      kicker: "LIVE DEMO TOUR",
      title: "ASTECH Store",
      stack: "React Native &nbsp;·&nbsp; Expo SDK 54 &nbsp;·&nbsp; Redux Toolkit",
      sub: "One codebase for iOS, Android and the web",
    },
    warmup: [BASE],
    scrubUrls: [BASE],
  });
  const { page, mark, settle } = tour;

  // 1. The home screen.
  console.log("STEP 1 home");
  mark("home");
  await humanGoto(page, BASE);
  await sleep(4000);
  // The catalogue is fetched on mount, so wait for the grid.
  for (let i = 0; i < 40; i++) {
    if ((await page.locator("img").count()) > 3) break;
    await sleep(500);
  }
  await sleep(2000);
  await settle("home");

  // 2. Filter by category.
  console.log("STEP 2 filter");
  mark("filter");
  const chip = page
    .locator('div:text-is("Electronics")')
    .first();
  if ((await chip.count()) > 0) {
    await chip.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => {});
    await sleep(700);
    await humanClick(page, chip);
    await sleep(2500);
  }
  await settle("filter");

  // 3. The product screen.
  console.log("STEP 3 product");
  mark("product");
  const productImg = page.locator("img").first();
  if ((await productImg.count()) > 0) {
    await productImg.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => {});
    await sleep(800);
    await humanClick(page, productImg);
    await sleep(3500);
  }
  // Show the reviews section, then add to cart.
  const reviews = page.locator('text=/Reviews/i').first();
  if ((await reviews.count()) > 0) {
    await reviews.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => {});
    await sleep(2000);
  }
  const addToCart = page.locator('text=/Add to cart/i').first();
  if ((await addToCart.count()) > 0) {
    await addToCart.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => {});
    await sleep(800);
    await humanClick(page, addToCart);
    await sleep(2500);
  }
  await settle("product");

  // 4. The cart.
  console.log("STEP 4 cart");
  mark("cart");
  // The header cart button is an icon, so it is the first role=button in
  // the header that holds an svg. The second one is the search icon.
  const cartIcon = page.locator('[role="button"]:has(svg)').first();
  if ((await cartIcon.count()) > 0) {
    await humanClick(page, cartIcon);
    await sleep(3200);
  }
  const total = page.locator('text=/Total/i').first();
  if ((await total.count()) > 0) {
    await total.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => {});
    await sleep(2200);
  }
  await settle("cart");

  // 5. End card.
  console.log("STEP 5 end");
  mark("end");
  await showEndCard(page, {
    kicker: "END OF TOUR",
    title: "ASTECH Store",
    stack: "React Native 0.81 &nbsp;·&nbsp; Expo SDK 54 &nbsp;·&nbsp; Redux Toolkit",
    sub: "One React Native codebase, running on iOS, on Android, and on the web.",
  });
  await settle("end", 600);
  const { videoPath } = await tour.finish(OUT_MP4);
  console.log(`VIDEO_RAW=${videoPath}`);
}

main().catch((e) => {
  console.error("RECORDING FAILED:", e);
  process.exit(1);
});
