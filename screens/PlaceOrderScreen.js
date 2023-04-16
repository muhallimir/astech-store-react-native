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
            <View className='mx-4 bg-gray-200 p-5 rounded-lg'>
                <View className='flex-row justify-between' >
                    <Text className='font-bold text-lg'>Shipping:</Text>
                    <Text className='text-lg'>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</Text>
                </View>
                <View className='flex-row justify-between' >
                    <Text className='font-bold text-lg'>Payment method:</Text>
                    <Text className='text-lg'>{cart.paymentMethod}</Text>
                </View>
                <View className='flex-row justify-between' >
                    <Text className='font-bold text-lg'>Ordered items:</Text>
                    <Text className='text-lg'>{cart.cartItems.length}</Text>
                </View>
                <View className='flex-row justify-between' >
                    <Text className='font-bold text-lg'>Items price:</Text>
                    <Text className='text-lg'>${cart.itemsPrice}</Text>
                </View>
                <View className='flex-row justify-between' >
                    <Text className='font-bold text-lg'>Shipping fee:</Text>
                    <Text className='text-lg'>${cart.shippingPrice}</Text>
                </View>
                <View className='flex-row justify-between' >
                    <Text className='font-bold text-lg'>VAT:</Text>
                    <Text className='text-lg'>${cart.taxPrice}</Text>
                </View>
                <View className='flex-row justify-between' >

                    <Text className='font-bold text-lg'>Total amount:</Text>
                    <Text className='text-lg'>${cart.totalPrice}</Text>
                </View>

                <TouchableOpacity className='bg-blue-900 p-5 mt-20 rounded-lg items-center' onPress={handlePlaceOrder}>
                    <Text className='text-white text-xl'>Place Order</Text>
                </TouchableOpacity>
            </View>
            <View>
                {loading && <Loader loading={loading} payment />}
                {error && <Text className='text-red-700'>error: {error}</Text>}
            </View>
        </SafeAreaView>
    )
}