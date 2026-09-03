import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ChatAlt2Icon } from "react-native-heroicons/solid";
import { ShoppingCartIcon } from 'react-native-heroicons/outline';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';



export default function CTA({ handleAddToCart, inCart }) {

    const navigation = useNavigation();

    const handleBuyNow = () => {
        handleAddToCart();
        navigation.navigate('CartScreen');
    }

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <TouchableOpacity >
                    <ChatAlt2Icon size={32} color='white' />
                </TouchableOpacity>
                <Text style={styles.tinyLabel}>Chat Now</Text>
            </View>
            <Text style={styles.divider}>|</Text>
            <View style={styles.column}>
                <TouchableOpacity onPress={handleAddToCart}>
                    <ShoppingCartIcon size={32} color='white' />
                </TouchableOpacity>
                <Text style={styles.tinyLabel}>{inCart ? 'Add more' : 'Add to cart'}</Text>
            </View>
            <Text style={styles.divider}>|</Text>
            <TouchableOpacity onPress={handleBuyNow}>
                <Text style={styles.ctaLabel}>{inCart ? 'View Cart' : 'Buy now'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1e40af',
        paddingVertical: 8,
        paddingHorizontal: 28,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    column: {
        alignItems: 'center',
    },
    tinyLabel: {
        color: '#ffffff',
        fontSize: 12,
    },
    divider: {
        color: '#ffffff',
        fontSize: 30,
        paddingVertical: 4,
    },
    ctaLabel: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 8,
    },
});

CTA.propTypes = {
    handleAddToCart: PropTypes.func.isRequired,
    inCart: PropTypes.bool.isRequired
}
