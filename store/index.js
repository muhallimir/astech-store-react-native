import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { productDetailsReducer, productListReducer } from "../reducers/productReducers";
import { cartReducer } from "../reducers/cartReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDetailsReducer, userRegisterReducer, userSignInReducer } from "../reducers/userReducer";
import { myPurchaseReducer, orderCreateReducer, orderListReducer, orderSummaryReducer } from "../reducers/orderReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import wishlistReducer from "./wishlistSlice";
import { hydrateWishlist } from "./wishlistSlice";

const initialState = {
  userSignIn: {
    userInfo: [],
  },
  cart: {
    cartItems: [],
  },
}

AsyncStorage.getItem("userInfo")
  .then(storedUserInfo => {
    if (storedUserInfo) {
      initialState.userSignIn.userInfo = JSON.parse(storedUserInfo);
    }
  })
  .catch(error => console.log(error));

AsyncStorage.getItem("cartItems")
  .then(storedCartItems => {
    if (storedCartItems) {
      initialState.cart.cartItems = JSON.parse(storedCartItems);
    }
  })
  .catch(error => console.log(error));

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  userDetails: userDetailsReducer,
  orderSummary: orderSummaryReducer,
  orderList: orderListReducer,
  myPurchase: myPurchaseReducer,
  wishlist: wishlistReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

AsyncStorage.getItem("wishlistItems")
  .then(storedWishlist => {
    if (storedWishlist) {
      try {
        const items = JSON.parse(storedWishlist);
        store.dispatch(hydrateWishlist(items));
      } catch (e) {
        // ignore parse errors
      }
    }
  })
  .catch(error => console.log(error));

export default store;




