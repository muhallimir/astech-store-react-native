import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import { RadioButton } from 'react-native-paper';
import OrderStepper from '../components/OrderStepper';


const PaymentScreen = () => {
    const [checked, setChecked] = useState('Paypal');

    const checkoutHandler = () => {
        console.log('Checkout');
    }

    return (
        <SafeAreaView>
            <Header />
            <OrderStepper step1 step2 step3 />
            <View className='flex self-center mt-40'>
                <View className='flex flex-row gap-1 items-center'>
                    <RadioButton
                        theme={{ colors: { primary: '#3b82f6' } }}
                        value="Paypal"
                        status={checked === 'Paypal' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Paypal')}
                    />
                    <Text className='text-base font-bold'>Paypal</Text>
                </View>
                <View className='flex flex-row gap-1 items-center'>
                    <RadioButton
                        theme={{ colors: { primary: '#3b82f6' } }}
                        value="Stripe"
                        status={checked === 'Stripe' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Stripe')}
                        disabled
                    />
                    <Text className='text-base font-bold'>Stripe (Coming soon..)</Text>
                </View>
                <TouchableOpacity
                    className='flex flex-row justify-center items-center bg-blue-900 p-3 rounded-md mt-5'
                    onPress={checkoutHandler}
                >
                    <Text className='text-white font-bold text-base'>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PaymentScreen
