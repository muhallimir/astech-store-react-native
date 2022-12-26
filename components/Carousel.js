import { View, Image } from 'react-native'
import React from 'react'
import Carousel from 'simple-carousel-react-native';
import Carousel2 from "../assets/images/carousel2.jpg";
import Carousel5 from "../assets/images/carousel5.jpg";


export default function () {
    return (
        <Carousel
            height={200}
            width={500}
            showScroll={false}
            showBubbles={false}
        >
            <View>
                <Image source={Carousel2} className='w-full h-full' />
            </View>
            <View>
                <Image source={Carousel5} className='w-full h-full' />
            </View>
        </Carousel>
    )
}
