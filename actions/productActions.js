import Axios from "axios";
import {
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
} from "../constants/productConstants";
import localData from "../utils/data";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_ASTECH_API_URL ||
  "https://astech-store.onrender.com/api";

const normalizeLocalProducts = () =>
  localData.products.map((product) => ({
    ...product,
    reviews: [],
  }));

export const listProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { data } = await Axios.get(`${API_BASE_URL}/products`, {
      timeout: 4000,
    });
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.warn(
      "[astech] live product API unreachable, falling back to bundled data:",
      error.message
    );
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: normalizeLocalProducts(),
    });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(
      `${API_BASE_URL}/products/${productId}`
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const localMatch = normalizeLocalProducts().find(
      (product) => String(product._id) === String(productId)
    );
    if (localMatch) {
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: localMatch });
      return;
    }
    dispatch({
      type: PRODUCT_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createReview =
  (productId, review) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `${API_BASE_URL}/products/${productId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: PRODUCT_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_REVIEW_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
