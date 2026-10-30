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
    const { cart: { cartItems }, userSignIn: { userInfo }, wishlist: { items: wishlistItems } } = useSelector((state) => state);
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
                <TouchableOpacity onPress={() => navigateToHome()} style={styles.logoWrapper}>
                    <Image source={Logo} style={styles.logo} />
                </TouchableOpacity>
                <View style={styles.rightSection}>
                    <View style={styles.userSection}>
                        <Text style={styles.greeting}>Hello,</Text>
                        {userInfo?.name ? (
                            <TouchableOpacity onPress={() => setIsOpenModal(true)}>
                                <Text style={styles.userName} numberOfLines={1}>{userInfo?.name}</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={navigateToSignIn}>
                                <Text style={styles.userName}>Sign in</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.iconRow}>
                        <TouchableOpacity onPress={() => navigateToOrderHistory()} style={styles.iconButton}>
                            <Text style={styles.iconLabel}>Orders</Text>
                        </TouchableOpacity>
                        <View style={styles.cartWrapper}>
                            {cartItems.length > 0 && <Text style={styles.cartBadge}>{cartItems.length}</Text>}
                            <TouchableOpacity onPress={() => navigateToCart()} style={styles.iconButton}>
                                <ShoppingCartIcon size={22} color='white' />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.iconButton}>
                            <SearchIcon size={22} color='white' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#1e3a8a',
        paddingVertical: 10,
        paddingHorizontal: 12,
        minHeight: 56,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    logoWrapper: {
        marginRight: 8,
    },
    logo: {
        height: 30,
        width: 100,
        resizeMode: 'contain',
    },
    rightSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 8,
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginRight: 8,
    },
    greeting: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
    },
    userName: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 13,
        maxWidth: 80,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    iconButton: {
        padding: 6,
    },
    iconLabel: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '500',
    },
    cartWrapper: {
        position: 'relative',
    },
    cartBadge: {
        position: 'absolute',
        zIndex: 10,
        top: -4,
        right: -4,
        fontSize: 10,
        color: '#ffffff',
        fontWeight: 'bold',
        backgroundColor: '#dc2626',
        borderRadius: 10,
        minWidth: 16,
        height: 16,
        textAlign: 'center',
        lineHeight: 16,
        paddingHorizontal: 3,
    },
});

export default Header