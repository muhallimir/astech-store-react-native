import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import PropTypes from 'prop-types';


export default function OrderStepper({ step1, step2, step3, step4 }) {
    return (
        <View className='flex flex-row self-center space-evenly mt-2 mx-1'>
            <View className={step1 ? 'flex-1 p-2 border-t-4 border-blue-900 pl-5' : 'flex-1 p-2 border-t-4 border-gray-400'}>
                <Text className={step1 ? 'text-blue-900 font-bold' : 'font-bold'}>Order</Text>
            </View>
            <View className={step2 ? 'flex-1 p-2 border-t-4 border-blue-900 pl-8' : 'flex-1 p-2 border-t-4 border-gray-400'}>
                <Text className={step2 ? 'text-blue-900 font-bold' : 'font-bold'}>Shipping</Text>
            </View>
            <View className={step3 ? 'flex-1 p-2 border-t-4 border-blue-900' : 'flex-1 p-2 border-t-4 border-gray-400'}>
                <Text className={step3 ? 'text-blue-900 font-bold' : 'font-normal'}>Payment</Text>
            </View>
            <View className={step4 ? 'flex-1 p-2 border-t-4 border-blue-900' : 'flex-1 p-2 border-t-4 border-gray-400'}>
                <Text className={step4 ? 'text-blue-900 font-bold' : 'font-normal'}>Checkout</Text>
            </View>
        </View>
    )
}

OrderStepper.propTypes = {
    step1: PropTypes.bool,
    step2: PropTypes.bool,
    step3: PropTypes.bool,
    step4: PropTypes.bool
}

OrderStepper.defaultProps = {
    step1: false,
    step2: false,
    step3: false,
    step4: false
}

