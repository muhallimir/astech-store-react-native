import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import Carousel2 from "../assets/images/carousel2.jpg";


export default function () {
    return (
        <View style={styles.container}>
            <Image source={Carousel2} style={styles.image} resizeMode="cover" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 192,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignSelf: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
