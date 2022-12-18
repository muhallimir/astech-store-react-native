import { View, Text, Image } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types';

export default function ProductCard({ data }) {

    const { products } = data;

    return (
        <View className='flex flex-row flex-wrap w-full'>
            {products.map((product) => (
                <View className='basis-1/2'>
                    <View className='border-2 border-blue-900 p-3 mt-2 mx-1'>
                        <Image source={product.image} className='object-contain h-36 w-full' />
                        <Text className='text-black font-bold mt-2'>{product.name.length > 23 ? product.name.substring(0, 18) + '...' : product.name}</Text>
                        <Text className='text-black font-bold'>{product.price}</Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

ProductCard.propTypes = {
    data: PropTypes.object.isRequired
}

ProductCard.defaultProps = {
    data: {}
}
