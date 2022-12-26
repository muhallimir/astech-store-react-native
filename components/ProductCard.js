import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types';
import { useNavigation } from "@react-navigation/core";
import Rating from './Rating';



export default function ProductCard({ products }) {
    const navigation = useNavigation();

    const navigateToProductScreen = (product) => {
        navigation.navigate('ProductScreen', { productId: product?._id })
    }

    return (
        <View className='flex flex-row flex-wrap w-full' onPress={
            () => navigateToProductScreen()
        }>
            {products?.length > 0 ? products?.map((product) => (
                <View className='basis-1/2' key={product?._id} >
                    <TouchableOpacity onPress={
                        () => navigateToProductScreen(product)
                    }>
                        <View className='border-2 border-blue-900 p-3 mt-2 mx-1'>
                            <Image source={{ uri: product?.image }}
                                className='object-contain h-36 w-full' />
                            <Text className='text-black font-bold mt-2'>{product?.name?.length > 23 ? product?.name?.substring(0, 18) + '...' : product?.name}</Text>
                            <Text className='text-black font-bold'>$ {product?.price}</Text>
                            <Rating numReviews={product?.numReviews} rating={product?.rating} />
                        </View>
                    </TouchableOpacity>
                </View>
            )) : <Text className='text-black font-bold'>No products found</Text>}
        </View>
    )
}

ProductCard.propTypes = {
    products: PropTypes.array,
}

ProductCard.defaultProps = {
    products: [],
}
