import { View, Text, TouchableOpacity } from 'react-native'
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

export default function PlaceOrderScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const { userSignIn: { userInfo }, userDetails: { user }, userUpdateProfile, cart } = useSelector((state) => state);
    const { loading, success, error, order } = useSelector((state) => state.orderCreate);

    useEffect(() => {
        if (!user) {
            dispatch(detailsUser(userInfo._id));
        } else {
            setEmail(user.email);
        }
        if (!cart.paymentMethod) {
            navigation.push('Payment');
        }
    }, [dispatch, userInfo._id, user]);


    // total price conversion to currency format e.g: 2.123 => "2.12" => 2.12
    const curPrice = (num) => Number(num.toFixed(2));

    //   a = accumulator c = current price
    cart.itemsPrice = curPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );

    cart.shippingPrice = cart.itemsPrice > 100 ? curPrice(0) : curPrice(10);
    cart.taxPrice = curPrice(0.15 * cart.itemsPrice);

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const handlePlaceOrder = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };

    useEffect(() => {
        if (success) {
            // navigation.navigate(`https://astech-store.onrender.com/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, success]);



    return (
        <SafeAreaView>
            <Header />
            <OrderStepper step1 step2 step3 step4 />
            <View style={{ padding: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18 }}>Shipping</Text>
                    <Text style={{ fontSize: 18 }}>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18 }}>Payment</Text>
                    <Text style={{ fontSize: 18 }}>{cart.paymentMethod}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18 }}>Order Items</Text>
                    <Text style={{ fontSize: 18 }}>{cart.cartItems.length}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18 }}>Items Price</Text>
                    <Text style={{ fontSize: 18 }}>${cart.itemsPrice}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18 }}>Shipping Price</Text>
                    <Text style={{ fontSize: 18 }}>${cart.shippingPrice}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18 }}>Tax Price</Text>
                    <Text style={{ fontSize: 18 }}>${cart.taxPrice}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18 }}>Total Price</Text>
                    <Text style={{ fontSize: 18 }}>${cart.totalPrice}</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#f0c14b', padding: 10, borderRadius: 5, marginTop: 20 }} onPress={handlePlaceOrder}>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}