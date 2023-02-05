import { applyMiddleware, combineReducers, compose, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { productDetailsReducer, productListReducer } from "../reducers/productReducers";
import { cartReducer } from "../reducers/cartReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userSignInReducer } from "../reducers/userReducer";


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
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;




