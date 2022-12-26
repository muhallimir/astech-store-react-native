import { applyMiddleware, combineReducers, compose, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { productDetailsReducer, productListReducer } from "../reducers/productReducers";

const initialState = {

}

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;




