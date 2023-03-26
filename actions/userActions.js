import Axios from "axios";
import { View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_DELETE_FAILED, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAILED, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_FAILED, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants";
import { WebView } from 'react-native-webview';
import { useRef } from "react";


export const signIn = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post(`https://astech-store.onrender.com/api/users/signin`, { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        AsyncStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post(`https://astech-store.onrender.com/api/users/register`, {
            name,
            email,
            password,
        });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        AsyncStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const signOut = () => (dispatch) => {
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("cartItems");
    AsyncStorage.removeItem("shippingAddress");
    dispatch({ type: USER_SIGNOUT });
};



// user profile 3
export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const {
        userSignIn: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`https://astech-store.onrender.com/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
    const {
        userSignIn: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`https://astech-store.onrender.com/api/users/profile`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
    }
};

export const listUsers = () => async (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST });
    try {
        const {
            userSignIn: { userInfo },
        } = getState();
        const { data } = await Axios.get("https://astech-store.onrender.com/api/users", {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_LIST_FAILED, payload: message });
    }
};

// Delete User (Admin)
export const deleteUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const {
        userSignIn: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.delete(`https://astech-store.onrender.com/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_DELETE_FAILED, payload: message });
    }
};

// Update User (Admin)
export const updateUser = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: user });
    const {
        userSignIn: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`https://astech-store.onrender.com/api/users/${user._id}`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_UPDATE_FAILED, payload: message });
    }
};


// export const signInWeb = (token) => async (dispatch) => {
//     try {
//         // Set the user token in the local storage of the WebView
//         const setTokenScript = `
//         (function() {
//           localStorage.setItem('token', '${token}');
//           window.ReactNativeWebView.postMessage('login_success');
//         })();
//       `;
//         const webViewRef = useRef(null);
//         const handleWebViewNavigation = useCallback((event) => {
//             if (event.url.startsWith('https://astech-store.onrender.com/order/')) {
//                 webViewRef.current.stopLoading();
//                 navigateToOrderDetails(event.url);
//             }
//         }, []);

//         return (
//             <View style={{ flex: 1 }}>
//                 <WebView
//                     ref={webViewRef}
//                     source={{ uri: 'https://astech-store.onrender.com/' }}
//                     onNavigationStateChange={handleWebViewNavigation}
//                     injectedJavaScript={setTokenScript}
//                 />
//             </View>
//         );
//     } catch (error) {
//         dispatch({
//             type: USER_SIGNIN_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//         });
//     }
// };