# Demo script: ASTECH Store, browse and cart

Status: script ready, not recorded. Recorded against the live Expo web
build at https://www.amir-mhlli.com/projects/astech/index.html, which is
the same bundle that ships to iOS and Android.

Target length: 65 to 85 seconds of phone footage, composited into a
1920x1080 frame with make_phone_frame.py.

Stack claims verified in repo: Expo SDK 54, React Native 0.81, React 19,
React Navigation v7 with a native stack, Redux Toolkit with redux-thunk,
AsyncStorage for persistence, react-native-web for the browser build, and
react-native-vector-icons for the header icons (package.json and
app.json, newArchEnabled true, orientation portrait).

Facts the tour shows, all visible on screen: the header with the sign in,
profile and order history links plus the cart and wishlist badges, the
search box, the horizontal category chip strip, the two column product
grid with prices and star ratings, the product detail screen with the
image carousel, the price, the description, the reviews section, the
wishlist heart, the Add to cart button, and the cart screen with the line
items, the quantity steppers and the total.

Data note: the live product API is unreachable from the deployed build, so
the app falls back to its bundled catalogue. The app logs that fallback
itself, and the grid still renders real products with real images, prices
and ratings. The tour does not claim the API is live.

Shots and voiceover lines (one line per segment, en-US-GuyNeural male).
Voice durations are measured from the generated clips.

1. intro card, 0.0 to 12.0 (12s, generated): "Welcome to the Astech Store
   mobile app, built with React Native and Expo. One codebase ships to
   iOS, Android and the web, and this tour runs in the browser."
   (voice 10.49s)
2. the home screen, 12.0 to 25.0 (13s): the blue header with the cart and
   wishlist, the search box, the category chip strip, the two column
   product grid with prices and star ratings. Line: "The home screen is a
   searchable catalogue with a category strip on top and a two column grid
   of products with prices and ratings." (voice 7.32s)
3. filter by category, 25.0 to 35.0 (10s): tap the Electronics chip, the
   grid narrows to that category. Line: "Tapping a category filters the
   grid in place, and the search box filters on top of it."
   (voice 5.54s)
4. the product screen, 35.0 to 49.0 (14s): tap a product. The detail
   screen with the image carousel, the price, the description, the reviews
   section, the wishlist heart, then tap Add to cart. Line: "Tapping a
   product opens the detail screen, with the photos, the price, the
   reviews, and a wishlist heart you can toggle." (voice 7.20s)
5. the cart, 49.0 to 62.0 (13s): tap the cart icon in the header, the cart
   badge shows the count, the cart screen lists the line items with the
   quantity steppers and the total. Line: "The cart keeps the line items,
   the quantity steppers and the total, and it is persisted so it
   survives a restart." (voice 6.74s)
6. end card, 62.0 to 70.5 (8.5s, generated): "One React Native codebase,
   running on iOS, on Android, and on the web." (voice 5.33s)

Assembly: the silent phone take is 430x932. It is scaled to the frame
height and centred over a 1920x1080 background that carries the project
name, the stack and the list of what the tour shows, using
make_phone_frame.py. The voice clips are placed with adelay at each
chapter start and mixed with amix normalize=0, then de-overlapped by the
timed voiceover script so two voices never play at once. Every clip is
shorter than its segment (10.49 in 12.0, 7.32 in 13.0, 5.54 in 10.0, 7.20
in 14.0, 6.74 in 13.0, 5.33 in 8.5), so no line gets cut.

Outputs:
demos/browse-and-cart/astech-store-browse-and-cart.mp4 (silent, 430x932)
demos/browse-and-cart/astech-store-browse-and-cart-voiced.mp4 (voiced, 430x932)
demos/browse-and-cart/astech-store-browse-and-cart-framed.mp4 (1920x1080, the one to publish)

Verification before publishing: the framed file is 1920x1080 and holds the
whole take. Voice present in every one of the 6 segments, checked with
volumedetect per window. Spot frames checked at the head and the tail of
every segment, with no loading spinner inside any used window. Max voice
gap under 10 seconds.

Notes for the recorder:
- Record at a phone viewport, 430 by 932, with isMobile and hasTouch on.
  At a desktop width the React Native layout stretches and stops looking
  like a phone.
- The product catalogue is fetched on mount, so wait for the product cards
  before tapping anything.
- The cart button in the header has no text, it is an icon. It is the
  first role=button in the header that contains an svg. The second svg
  button is the search icon.
- The Add to cart label changes to "Add more" once the product is in the
  cart, so match on the text Add to cart and only tap it once.
- The category chips are TouchableOpacity elements that render as a div
  with the chip text inside. Match the exact text, for example Electronics.
