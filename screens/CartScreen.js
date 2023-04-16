import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { ScrollView } from 'react-native-gesture-handler';


export default function CartScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const getCountInStock = (id) => {
        const product = cartItems.find((item) => item?.product === id);
        return product?.countInStock;
    };

    const qtyUpdateHandler = (id, qty) => {
        if (qty > getCountInStock(id)) {
            alert('Sorry, we do not have enough items in stock');
        } else if (qty < 1) {
            dispatch(removeFromCart(id));
        } else {
            dispatch(addToCart(id, qty));
        }
    };

    const checkoutHandler = () => {
        navigation.navigate('Shipping');
    };

    return (
        <>
            <SafeAreaView>
                <Header />
                <ScrollView className='flex-1 h-full overflow-y-auto w-full'>
                    <View className='flex flex-row justify-between items-center p-3'>
                        <Text className='text-black font-bold text-lg'>Shopping Cart</Text>
                        <Text className='text-black font-bold text-lg'>{cartItems?.length} item(s)</Text>
                    </View>
                    <View className='flex flex-col w-full'>
                        {cartItems?.length === 0 ? (
                            <View className='flex flex-col items-center justify-center w-full mt-3'>
                                <Text className='text-black font-bold text-xl mb-2'>Your cart is empty</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                    <Text className='text-blue-900 font-bold text-2xl'>Click here to start shopping</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View className='flex flex-col w-full mb-28'>
                                {cartItems?.map((item) => (
                                    <View className='flex-row justify-between items-center p-3' key={item?.product}>
                                        <View className='flex flex-row items-center'>
                                            <Image source={{ uri: item?.image }}
                                                style={{ width: 100, height: 100, resizeMode: 'contain' }} />
                                            <View className='flex flex-col items-start justify-center ml-3'>
                                                <Text className='text-black font-bold text-lg'>{item?.name}</Text>
                                                <Text className='text-black font-bold text-base'>${item?.price}</Text>
                                                <View className='flex flex-row items-center justify-center'>
                                                    <Text className='text-gray-900 font-bold text-sm'>Quantity:</Text>
                                                    <View className='flex flex-row items-center justify-center ml-3'>
                                                        <TouchableOpacity onPress={() => qtyUpdateHandler(item?.product, item?.qty - 1)}>
                                                            <Text className='text-blue-900 font-bold text-xl'>-</Text>
                                                        </TouchableOpacity>
                                                        <Text className='text-blue-900 font-bold text-base ml-3 mr-3'>{item?.qty}</Text>
                                                        <TouchableOpacity onPress={() => qtyUpdateHandler(item?.product, item?.qty + 1)}>
                                                            <Text className='text-blue-900 font-bold text-xl'>+</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                                <View className='flex flex-row justify-between items-center p-3'>
                                    <Text className='text-black font-bold text-2xl'>Total</Text>
                                    <Text className='text-black font-bold text-2xl'>
                                        ${cartItems?.reduce((acc, item) => acc + item?.price * item?.qty, 0).toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>

                </ScrollView>
                <View className='absolute w-full bottom-12'>
                    <TouchableOpacity
                        className='bg-blue-900 p-3 items-center justify-center'
                        onPress={checkoutHandler}
                    >
                        <Text className='text-white font-bold text-2xl'>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        </>
    )
}

