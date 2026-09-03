# AStech Store

A mobile e-commerce application for AStech, built with React Native and Expo. Customers can browse the catalog, manage a cart, complete checkout, view order history, and sign in or register for an account. The app ships native-quality UI on iOS, Android, and the web from a single codebase.

## Features

- Product browsing with image carousel, categories, and ratings
- Product detail pages with reviews and the ability to submit a review when signed in
- Cart management with quantity updates and totals
- Sign in and register flows with persisted session
- Shipping address and payment method capture
- Place order flow that hands off to a payment web view
- Order history with status details
- Wishlist/favorites on the product screen with a heart toggle and a header count badge
- Home screen search bar plus horizontal category chip strip for filtering
- Order tracking screen with a vertical timeline (Pending, Confirmed, Shipped, Delivered) and ETA

## Tech stack

- Expo SDK 54
- React Native 0.81
- React 19
- React Navigation v7 (native-stack and stack)
- Redux Toolkit with redux-thunk for state management
- AsyncStorage for local persistence
- react-native-paper for UI primitives
- Axios for HTTP
- react-native-heroicons, react-native-ratings, and other supporting libraries

## Project structure

```
.
├── App.js                # Root navigator and Redux Provider
├── app.json              # Expo config (name, scheme, bundle ids)
├── index.js              # Expo AppEntry registration
├── actions/              # Redux action creators
├── reducers/             # Redux reducers (legacy switch/case)
├── store/                # Store config and createSlice-based slices (wishlist)
├── screens/              # Screen components (Home, Product, Cart, SignIn, etc.)
├── components/           # Shared UI (Header, Carousel, Categories, ProductCard, ...)
├── constants/            # Redux action type constants
├── utils/                # Static catalog data used by the demo
├── assets/               # Icons, splash, and product images
└── package.json          # Dependencies and scripts
```

Native folders (`android/`, `ios/`) are not checked in. They are generated on demand with Expo prebuild when you build for a native platform.

## Run instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the Metro dev server (iOS/Android simulator or Expo Go):

   ```bash
   npx expo start
   ```

3. Run the web target in the browser:

   ```bash
   npx expo start --web
   ```

4. Build a production web bundle into `dist/`:

   ```bash
   npm run build:web
   ```

When you are ready to produce a native binary, run `npx expo prebuild` to generate the `android/` and `ios/` project folders.

## License

MIT, by Amirsali.
