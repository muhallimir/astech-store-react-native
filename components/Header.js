import { Image, Text, View } from 'react-native'
import React, { Component } from 'react'
import Logo from "../assets/images/Logo.png";
import {
    SearchIcon,
} from "react-native-heroicons/outline";
import { ShoppingCartIcon } from "react-native-heroicons/solid";


const Header = () => {
    return (
        <View className='bg-blue-900 py-2'>
            <View className='flex-row space-x-3'>
                <Image source={Logo} className="h-7 w-32 object-contain ml-1 mt-1 mr-2" />
                <View className='flex-column items-center'>
                    <Text className='text-white text-xs'>Hello</Text>
                    <Text className='text-white font-bold'>Sign in</Text>
                </View>
                <View className='flex-column items-center'>
                    <Text className='text-white text-xs'>Manage</Text>
                    <Text className='text-white font-bold'>Profile</Text>
                </View>
                <View className='flex-column items-center'>
                    <Text className='text-white text-xs'>Admin</Text>
                    <Text className='text-white font-bold'>Access</Text>
                </View>
                <View className='pt-0.5'>
                    <ShoppingCartIcon size={32} color='white' />
                </View>
                <View>
                    <SearchIcon size={31} color='white' />
                </View>
            </View>
        </View>
    )
}

export default Header