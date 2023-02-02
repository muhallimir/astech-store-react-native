import { applyMiddleware, combineReducers, compose, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { productDetailsReducer, productListReducer } from "../reducers/productReducers";
import { cartReducer } from "../reducers/cartReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";


const initialState = {
  cart: {
    cartItems: [],
  }
}

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
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;




