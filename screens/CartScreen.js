import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { ScrollView } from 'react-native-gesture-handler';


export default function CartScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const getCountInStock = (id) => {
        const product = cartItems.find((item) => item?.product === id);
        return product?.countInStock;
    };

    const qtyUpdateHandler = (id, qty) => {
        if (qty > getCountInStock(id)) {
            alert('Sorry, we do not have enough items in stock');
        } else if (qty < 1) {
            dispatch(removeFromCart(id));
        } else {
            dispatch(addToCart(id, qty));
        }
    };

    const checkoutHandler = () => {
        navigation.navigate('Shipping');
    };

    return (
        <>
            <SafeAreaView>
                <Header />
                <ScrollView style={styles.scroll}>
                    <View style={styles.headerRow}>
                        <Text style={styles.heading}>Shopping Cart</Text>
                        <Text style={styles.heading}>{cartItems?.length} item(s)</Text>
                    </View>
                    <View style={styles.body}>
                        {cartItems?.length === 0 ? (
                            <View style={styles.empty}>
                                <Text style={styles.emptyTitle}>Your cart is empty</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                    <Text style={styles.emptyCta}>Click here to start shopping</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.list}>
                                {cartItems?.map((item) => (
                                    <View style={styles.itemRow} key={item?.product}>
                                        <View style={styles.item}>
                                            <Image source={{ uri: item?.image }}
                                                style={{ width: 100, height: 100, resizeMode: 'contain' }} />
                                            <View style={styles.itemDetail}>
                                                <Text style={styles.itemName}>{item?.name}</Text>
                                                <Text style={styles.itemPrice}>${item?.price}</Text>
                                                <View style={styles.qtyRow}>
                                                    <Text style={styles.qtyLabel}>Quantity:</Text>
                                                    <View style={styles.qtyControls}>
                                                        <TouchableOpacity onPress={() => qtyUpdateHandler(item?.product, item?.qty - 1)}>
                                                            <Text style={styles.qtyBtn}>-</Text>
                                                        </TouchableOpacity>
                                                        <Text style={styles.qtyValue}>{item?.qty}</Text>
                                                        <TouchableOpacity onPress={() => qtyUpdateHandler(item?.product, item?.qty + 1)}>
                                                            <Text style={styles.qtyBtn}>+</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                                <View style={styles.totalRow}>
                                    <Text style={styles.totalLabel}>Total</Text>
                                    <Text style={styles.totalLabel}>
                                        ${cartItems?.reduce((acc, item) => acc + item?.price * item?.qty, 0).toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>

                </ScrollView>
                <View style={styles.checkoutBar}>
                    <TouchableOpacity
                        style={styles.checkoutBtn}
                        onPress={checkoutHandler}
                    >
                        <Text style={styles.checkoutLabel}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        </>
    )
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
    },
    heading: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
    },
    body: {
        width: '100%',
    },
    empty: {
        alignItems: 'center',
        marginTop: 12,
    },
    emptyTitle: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8,
    },
    emptyCta: {
        color: '#1e3a8a',
        fontWeight: 'bold',
        fontSize: 24,
    },
    list: {
        marginBottom: 112,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemDetail: {
        marginLeft: 12,
    },
    itemName: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
    },
    itemPrice: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyLabel: {
        color: '#111827',
        fontWeight: 'bold',
        fontSize: 14,
    },
    qtyControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    qtyBtn: {
        color: '#1e3a8a',
        fontWeight: 'bold',
        fontSize: 20,
    },
    qtyValue: {
        color: '#1e3a8a',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 12,
        marginRight: 12,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
    },
    totalLabel: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 24,
    },
    checkoutBar: {
        position: 'absolute',
        width: '100%',
        bottom: 48,
    },
    checkoutBtn: {
        backgroundColor: '#1e3a8a',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutLabel: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 24,
    },
});
