import { Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ChatAlt2Icon } from "react-native-heroicons/solid";
import { ShoppingCartIcon } from 'react-native-heroicons/outline';
import PropTypes from 'prop-types';



export default function CTA({ handleAddToCart }) {

    return (
        <View className='flex-row justify-between bg-blue-800 py-2 px-7 absolute inset-x-0 bottom-0'>
            <View className='items-center'>
                <TouchableOpacity >
                    <ChatAlt2Icon size={32} color='white' />
                </TouchableOpacity>
                <Text className='text-white text-xs'>Chat Now</Text>
            </View>
            <Text className=' text-white text-3xl py-1'>|</Text>
            <View className='items-center'>
                <TouchableOpacity onPress={handleAddToCart}>
                    <ShoppingCartIcon size={32} color='white' />
                </TouchableOpacity>
                <Text className='text-white text-xs'>Add to cart</Text>
            </View>
            <Text className=' text-white text-3xl py-1'>|</Text>
            <TouchableOpacity>
                <Text className='text-white text-xl font-bold p-2'>Buy now</Text>
            </TouchableOpacity>
        </View>
    )
}

CTA.propTypes = {
    handleAddToCart: PropTypes.func.isRequired,
}



