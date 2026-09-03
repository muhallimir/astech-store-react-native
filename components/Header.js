import { Image, Text, View, Modal, StyleSheet } from 'react-native'
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
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigateToHome()}>
                    <Image source={Logo} style={styles.logo} />
                </TouchableOpacity>
                <View style={styles.column}>
                    <Text style={styles.smallLabel}>Hello</Text>
                    {userInfo?.name ? (<TouchableOpacity onPress={() => setIsOpenModal(true)}>
                        <Text style={styles.boldLabel}>{userInfo?.name}</Text>
                    </TouchableOpacity>) : (<TouchableOpacity onPress={navigateToSignIn}>
                        <Text style={styles.boldLabel}>Sign in</Text>
                    </TouchableOpacity>)}
                </View>
                <View style={styles.column}>
                    <Text style={styles.smallLabel}>Manage</Text>
                    <TouchableOpacity>
                        <Text style={styles.boldLabel}>Profile</Text>
                    </TouchableOpacity>
                </View>
                {isAdmin ? <View style={styles.column}>
                    <Text style={styles.smallLabel}>Admin</Text>
                    <TouchableOpacity>
                        <Text style={styles.boldLabel}>Access</Text>
                    </TouchableOpacity>
                </View> :
                    <View style={styles.column}>
                        <Text style={styles.smallLabel}>Order</Text>
                        <TouchableOpacity onPress={() => navigateToOrderHistory()}>
                            <Text style={styles.boldLabel}>History</Text>
                        </TouchableOpacity>
                    </View>
                }
                <View style={styles.cartWrapper}>
                    {cartItems.length > 0 && <Text style={styles.cartBadge}>{cartItems.length}</Text>}
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#1e3a8a',
        paddingVertical: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    logo: {
        height: 28,
        width: 128,
        resizeMode: 'contain',
        marginLeft: 4,
        marginTop: 4,
        marginRight: 8,
    },
    column: {
        alignItems: 'center',
    },
    smallLabel: {
        color: '#ffffff',
        fontSize: 12,
    },
    boldLabel: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    cartWrapper: {
        paddingTop: 2,
    },
    cartBadge: {
        position: 'absolute',
        zIndex: 10,
        left: 32,
        bottom: 24,
        fontSize: 12,
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default Header
