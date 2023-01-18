import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

export default function Rating({ rating, numReviews }) {
    const [isReviewer, setIsReviewer] = useState(true)

    useEffect(() => {
        if (numReviews > 0) {
            setIsReviewer(false)
        }
    }, [numReviews])

    return (
        <View className='flex flex-row items-center'>
            <View className='flex flex-row items-center'>
                <FontAwesomeIcon icon={rating >= 1 ? faStar : rating >= 0.5 ? faStarHalfAlt : farStar} style={
                    rating >= 1 ? { color: '#f8e825' } : rating >= 0.5 ? { color: '#f8e825' } : { color: '#f8e825' }
                } />
                <FontAwesomeIcon icon={rating >= 2 ? faStar : rating >= 1.5 ? faStarHalfAlt : farStar} style={
                    rating >= 2 ? { color: '#f8e825' } : rating >= 1.5 ? { color: '#f8e825' } : { color: '#f8e825' }
                } />
                <FontAwesomeIcon icon={rating >= 3 ? faStar : rating >= 2.5 ? faStarHalfAlt : farStar} style={
                    rating >= 3 ? { color: '#f8e825' } : rating >= 2.5 ? { color: '#f8e825' } : { color: '#f8e825' }
                } />
                <FontAwesomeIcon icon={rating >= 4 ? faStar : rating >= 3.5 ? faStarHalfAlt : farStar} style={
                    rating >= 4 ? { color: '#f8e825' } : rating >= 3.5 ? { color: '#f8e825' } : { color: '#f8e825' }
                } />
                <FontAwesomeIcon icon={rating >= 5 ? faStar : rating >= 4.5 ? faStarHalfAlt : farStar} style={
                    rating >= 5 ? { color: '#f8e825' } : rating >= 4.5 ? { color: '#f8e825' } : { color: '#f8e825' }
                } />
            </View>
            {!isReviewer && <Text className='text-sm text-gray-500 ml-2'>{numReviews} reviews </Text>}
        </View>
    )
}

Rating.propTypes = {
    rating: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    numReviews: PropTypes.number,
}

Rating.defaultProps = {
    rating: 0,
    numReviews: 0,
}
