import { View, Image } from 'react-native'
import React from 'react'
import Carousel2 from "../assets/images/carousel2.jpg";


export default function () {
    return (
        <View className='h-48 w-full ml-auto mr-auto self-center'>
            <Image source={Carousel2} className='w-full h-full' />
        </View>
    )
}
