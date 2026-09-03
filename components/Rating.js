import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
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

    const starStyle = { color: '#f8e825' };

    return (
        <View style={styles.container}>
            <View style={styles.starRow}>
                <FontAwesomeIcon icon={rating >= 1 ? faStar : rating >= 0.5 ? faStarHalfAlt : farStar} style={starStyle} />
                <FontAwesomeIcon icon={rating >= 2 ? faStar : rating >= 1.5 ? faStarHalfAlt : farStar} style={starStyle} />
                <FontAwesomeIcon icon={rating >= 3 ? faStar : rating >= 2.5 ? faStarHalfAlt : farStar} style={starStyle} />
                <FontAwesomeIcon icon={rating >= 4 ? faStar : rating >= 3.5 ? faStarHalfAlt : farStar} style={starStyle} />
                <FontAwesomeIcon icon={rating >= 5 ? faStar : rating >= 4.5 ? faStarHalfAlt : farStar} style={starStyle} />
            </View>
            {!isReviewer && <Text style={styles.reviewCount}>{numReviews} reviews </Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewCount: {
        fontSize: 14,
        color: '#6b7280',
        marginLeft: 8,
    },
});

Rating.defaultProps = {
    rating: 0,
    numReviews: 0,
}
