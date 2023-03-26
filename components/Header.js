import { Image, Text, View, Modal } from 'react-native'
import Logo from "../assets/images/Logo.png";
import { SearchIcon } from "react-native-heroicons/outline";
import { ShoppingCartIcon } from "react-native-heroicons/solid";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../actions/userActions';
import { useState } from 'react';
import WarningModal from './modals/WarningModal';


const Header = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { cart: { cartItems }, userSignIn: { userInfo } } = useSelector((state) => state);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const isAdmin = userInfo?.isAdmin;

    const navigateToHome = () => {
        navigation.navigate('Home')
    }

    const navigateToCart = () => {
        navigation.navigate('CartScreen')
    }

    const navigateToSignIn = () => {
        navigation.navigate('SignIn')
    }

    const navigateToOrderHistory = () => {
        navigation.navigate('OrderHistory')
    }

    const handleSignOut = () => {
        dispatch(signOut());
        navigation.navigate('SignIn')
    }



    return (
        <>
            <WarningModal message={'This will sign you out. Would you like to continue?'} handleSignOut={handleSignOut} setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} />
            <View className='flex-row bg-blue-900 py-2 h-12 justify-center items-center space-x-2'>
                <TouchableOpacity onPress={() => navigateToHome()}>
                    <Image source={Logo} className="h-7 w-32 object-contain ml-1 mt-1 mr-2" />
                </TouchableOpacity>
                <View className='items-center'>
                    <Text className='text-white text-xs'>Hello</Text>
                    {userInfo?.name ? (<TouchableOpacity onPress={() => setIsOpenModal(true)}>
                        <Text className='text-white font-bold'>{userInfo?.name}</Text>
                    </TouchableOpacity>) : (<TouchableOpacity onPress={navigateToSignIn}>
                        <Text className='text-white font-bold'>Sign in</Text>
                    </TouchableOpacity>)}
                </View>
                <View className='items-center'>
                    <Text className='text-white text-xs'>Manage</Text>
                    <TouchableOpacity>
                        <Text className='text-white font-bold'>Profile</Text>
                    </TouchableOpacity>
                </View>
                {isAdmin ? <View className='items-center'>
                    <Text className='text-white text-xs'>Admin</Text>
                    <TouchableOpacity>
                        <Text className='text-white font-bold'>Access</Text>
                    </TouchableOpacity>
                </View> :
                    <View className='items-center'>
                        <Text className='text-white text-xs'>Order</Text>
                        <TouchableOpacity onPress={() => navigateToOrderHistory()}>
                            <Text className='text-white font-bold'>History</Text>
                        </TouchableOpacity>
                    </View>
                }
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
        </>
    )
}

export default Header