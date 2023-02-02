import { Image, SafeAreaView, Text, View } from 'react-native'
import Logo from "../assets/images/Logo.png";
import { SearchIcon } from "react-native-heroicons/outline";
import { ShoppingCartIcon } from "react-native-heroicons/solid";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';


const Header = () => {
    const navigation = useNavigation();
    const { cartItems } = useSelector(state => state.cart);

    const navigateToHome = () => {
        navigation.navigate('Home')
    }

    const navigateToCart = () => {
        navigation.navigate('CartScreen')
    }

    return (
        <View className='flex-1 bg-blue-900 py-2'>
            <View className='flex-row space-x-3'>
                <TouchableOpacity onPress={() => navigateToHome()}>
                    <Image source={Logo} className="h-7 w-32 object-contain ml-1 mt-1 mr-2" />
                </TouchableOpacity>
                <View className='items-center'>
                    <Text className='text-white text-xs'>Hello</Text>
                    <TouchableOpacity>
                        <Text className='text-white font-bold'>Sign in</Text>
                    </TouchableOpacity>
                </View>
                <View className='items-center'>
                    <Text className='text-white text-xs'>Manage</Text>
                    <TouchableOpacity>
                        <Text className='text-white font-bold'>Profile</Text>
                    </TouchableOpacity>
                </View>
                <View className='items-center'>
                    <Text className='text-white text-xs'>Admin</Text>
                    <TouchableOpacity>
                        <Text className='text-white font-bold'>Access</Text>
                    </TouchableOpacity>
                </View>
                <View className='pt-0.5'>
                    {cartItems.length > 0 && <Text className='absolute z-10 left-8 bottom-6 text-xs text-white font-bold'>{cartItems.length}</Text>}
                    <TouchableOpacity onPress={() => navigateToCart()}>
                        <ShoppingCartIcon size={32} color='white' />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity>
                        <SearchIcon size={31} color='white' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header