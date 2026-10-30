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
                <View style={styles.navSection}>
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
                </View>
                <View style={styles.iconSection}>
                    <View style={styles.cartWrapper}>
                        {cartItems.length > 0 && <Text style={styles.cartBadge}>{cartItems.length}</Text>}
                        <TouchableOpacity onPress={() => navigateToCart()} style={styles.iconButton}>
                            <ShoppingCartIcon size={24} color='white' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wishlistWrapper}>
                        {wishlistItems.length > 0 && <Text style={styles.wishlistBadge}>{wishlistItems.length}</Text>}
                        <TouchableOpacity style={styles.iconButton}>
                            <Text style={styles.wishlistIcon}>{'\u2764'}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.iconButton}>
                        <SearchIcon size={24} color='white' />
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
        paddingVertical: 12,
        paddingHorizontal: 12,
        minHeight: 64,
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
        height: 32,
        width: 120,
        resizeMode: 'contain',
    },
    navSection: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        gap: 12,
    },
    column: {
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    smallLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        marginBottom: 2,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    boldLabel: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 13,
    },
    iconSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    iconButton: {
        padding: 6,
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
        minWidth: 18,
        height: 18,
        textAlign: 'center',
        lineHeight: 18,
        paddingHorizontal: 4,
    },
    wishlistWrapper: {
        position: 'relative',
    },
    wishlistBadge: {
        position: 'absolute',
        zIndex: 10,
        top: -4,
        right: -4,
        fontSize: 10,
        color: '#ffffff',
        fontWeight: 'bold',
        backgroundColor: '#dc2626',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        textAlign: 'center',
        lineHeight: 18,
        paddingHorizontal: 4,
    },
    wishlistIcon: {
        fontSize: 20,
        color: '#ffffff',
    },
});

export default Header