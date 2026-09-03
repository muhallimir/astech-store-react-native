import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/core";
import Rating from './Rating';



export default function ProductCard({ products }) {
    const navigation = useNavigation();

    const navigateToProductScreen = (product) => {
        navigation.navigate('ProductScreen', { productId: product?._id })
    }

    return (
        <View style={styles.container}>
            {products?.length > 0 ? products?.map((product) => (
                <View style={styles.half} key={product?._id} >
                    <TouchableOpacity onPress={
                        () => navigateToProductScreen(product)
                    }>
                        <View style={styles.card}>
                            <Image source={{ uri: product?.image }}
                                style={styles.image} resizeMode="contain" />
                            <Text style={styles.productName}>{product?.name?.length > 23 ? product?.name?.substring(0, 18) + '...' : product?.name}</Text>
                            <Text style={styles.price}>$ {product?.price}</Text>
                            <Rating numReviews={product?.numReviews} rating={product?.rating} />
                        </View>
                    </TouchableOpacity>
                </View>
            )) : <Text style={styles.empty}>No products found</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    half: {
        width: '50%',
    },
    card: {
        borderWidth: 2,
        borderColor: '#1e3a8a',
        padding: 12,
        marginTop: 8,
        marginHorizontal: 4,
    },
    image: {
        height: 144,
        width: '100%',
    },
    productName: {
        color: '#000000',
        fontWeight: 'bold',
        marginTop: 8,
    },
    price: {
        color: '#000000',
        fontWeight: 'bold',
    },
    empty: {
        color: '#000000',
        fontWeight: 'bold',
    },
});

ProductCard.defaultProps = {
    products: [],
}
