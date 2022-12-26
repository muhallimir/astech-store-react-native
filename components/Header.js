import { Image, Text, View } from 'react-native'
import Logo from "../assets/images/Logo.png";
import {
    SearchIcon,
} from "react-native-heroicons/outline";
import { ShoppingCartIcon } from "react-native-heroicons/solid";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';


const Header = () => {
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Home')
    }

    return (
        <View className='flex-1 bg-blue-900 py-2'>
            <View className='flex-row space-x-3'>
                <TouchableOpacity onPress={() => navigateToHome()}>
                    <Image source={Logo} className="h-7 w-32 object-contain ml-1 mt-1 mr-2" />
                </TouchableOpacity>
                <View className='flex-column items-center'>
                    <Text className='text-white text-xs'>Hello</Text>
                    <TouchableOpacity>
                        <Text className='text-white font-bold'>Sign in</Text>
                    </TouchableOpacity>
                </View>
                <View className='flex-column items-center'>
                    <Text className='text-white text-xs'>Manage</Text>
                    <TouchableOpacity>
                        <Text className='text-white font-bold'>Profile</Text>
                    </TouchableOpacity>
                </View>
                <View className='flex-column items-center'>
                    <Text className='text-white text-xs'>Admin</Text>
                    <TouchableOpacity>
                        <Text className='text-white font-bold'>Access</Text>
                    </TouchableOpacity>
                </View>
                <View className='pt-0.5'>
                    <TouchableOpacity>
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