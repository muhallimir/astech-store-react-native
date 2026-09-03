import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import OrderStepper from '../components/OrderStepper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { detailsUser } from '../actions/userActions';
import Loader from '../components/Loader';
import { navigateToWebviewScreen } from './WebViewScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlaceOrderScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [_id, set_id] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const { userSignIn: { userInfo }, userDetails: { user }, cart } = useSelector((state) => state);
    const token = userInfo.token;
    const { loading, success, error, order } = useSelector((state) => state.orderCreate);


    useEffect(() => {
        if (!user) {
            dispatch(detailsUser(userInfo._id));
        } else {
            setEmail(user.email);
            setName(user.name);
            set_id(user._id);
            setIsAdmin(user.isAdmin);
        }
        if (!cart.paymentMethod) {
            navigation.push('Payment');
        }
    }, [dispatch, userInfo._id, user]);

    const curPrice = (num) => Number(num.toFixed(2));

    cart.itemsPrice = curPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );

    cart.shippingPrice = cart.itemsPrice > 100 ? curPrice(0) : curPrice(10);
    cart.taxPrice = curPrice(0.15 * cart.itemsPrice);

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const handlePlaceOrder = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };

    const handleWebView = (orderId) => {
        navigateToWebviewScreen(navigation, { orderId, _id, name, email, isAdmin, token });
    }

    useEffect(() => {
        if (success) {
            handleWebView(order._id);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, success]);



    return (
        <SafeAreaView>
            <Header />
            <OrderStepper step1 step2 step3 step4 />
            <View style={styles.summary}>
                <View style={styles.row} >
                    <Text style={styles.rowLabel}>Shipping:</Text>
                    <Text style={styles.rowValue}>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</Text>
                </View>
                <View style={styles.row} >
                    <Text style={styles.rowLabel}>Payment method:</Text>
                    <Text style={styles.rowValue}>{cart.paymentMethod}</Text>
                </View>
                <View style={styles.row} >
                    <Text style={styles.rowLabel}>Ordered items:</Text>
                    <Text style={styles.rowValue}>{cart.cartItems.length}</Text>
                </View>
                <View style={styles.row} >
                    <Text style={styles.rowLabel}>Items price:</Text>
                    <Text style={styles.rowValue}>${cart.itemsPrice}</Text>
                </View>
                <View style={styles.row} >
                    <Text style={styles.rowLabel}>Shipping fee:</Text>
                    <Text style={styles.rowValue}>${cart.shippingPrice}</Text>
                </View>
                <View style={styles.row} >
                    <Text style={styles.rowLabel}>VAT:</Text>
                    <Text style={styles.rowValue}>${cart.taxPrice}</Text>
                </View>
                <View style={styles.row} >

                    <Text style={styles.rowLabel}>Total amount:</Text>
                    <Text style={styles.rowValue}>${cart.totalPrice}</Text>
                </View>

                <TouchableOpacity style={styles.cta} onPress={handlePlaceOrder}>
                    <Text style={styles.ctaLabel}>Place Order</Text>
                </TouchableOpacity>
            </View>
            <View>
                {loading && <Loader loading={loading} payment />}
                {error && <Text style={styles.error}>error: {error}</Text>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    summary: {
        marginHorizontal: 16,
        backgroundColor: '#e5e7eb',
        padding: 20,
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowLabel: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    rowValue: {
        fontSize: 18,
    },
    cta: {
        backgroundColor: '#1e3a8a',
        padding: 20,
        marginTop: 80,
        borderRadius: 8,
        alignItems: 'center',
    },
    ctaLabel: {
        color: '#ffffff',
        fontSize: 20,
    },
    error: {
        color: '#b91c1c',
    },
});
