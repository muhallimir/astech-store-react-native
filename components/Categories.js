import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Electronics from "../assets/images/electronics.png";
import Gaming from "../assets/images/gaming.png";
import Pants from "../assets/images/pants.png";
import Shirts from "../assets/images/shirts.png";

export default function Categories() {
    return (
        <View className='flex-row pt-12 px-7 self-center gap-5 min-w-fit z-10 -mt-36'>
            <TouchableOpacity>
                <View className='items-center gap-1'>
                    <Image source={Electronics} className='w-12 h-12' />
                    <Text className='text-black font-bold'>Electronics</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View className='items-center gap-1'>
                    <Image source={Gaming} className='w-12 h-12' />
                    <Text className='text-black font-bold'>Gaming</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View className='items-center gap-1'>
                    <Image source={Pants} className='w-12 h-12' />
                    <Text className='text-black font-bold'>Pants</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View className='items-center gap-1'>
                    <Image source={Shirts} className='w-12 h-12' />
                    <Text className='text-black font-bold'>Shirts</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}