import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { createReview, detailsProduct } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import CTA from '../components/CTA';
import moment from 'moment/moment';
import { addToCart } from '../actions/cartActions';
import { Rating as StarRate } from 'react-native-ratings';
import { toggleWishlist } from '../store/wishlistSlice';

export default function ProductScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { params: { productId } } = useRoute();
    const { productDetails, cart: { cartItems } } = useSelector((state) => state);
    const { userInfo } = useSelector((state) => state.userSignIn);
    const { items: wishlistItems } = useSelector((state) => state.wishlist);
    const { loading, error, product } = productDetails;
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const dateCreated = moment(product?.createdAt).format('YYYY-MM-DD');
    const inCart = cartItems.find((item) => item.product === productId) ? true : false;
    const inWishlist = wishlistItems.includes(productId);

    console.log('inCart', inCart);

    useEffect(() => {
        dispatch(detailsProduct(productId));
        console.log(rating);
    }, [dispatch, productId]);

    const handleSubmit = (e) => {
        if (comment && rating) {
            dispatch(
                createReview(productId, { rating, comment, name: userInfo.name })
            );
        } else {
            alert("Please enter comment and rating");
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product._id, qty));
    };

    const handleToggleWishlist = () => {
        dispatch(toggleWishlist(productId));
    };

    const onFinishRatingPress = (rating) => {
        setRating(rating);
    };


    return (
        <>
            <SafeAreaView style={styles.safe}>
                <Header />
                {loading ? <Loader loading={loading} /> : error ? <Text style={styles.errorBold}>{error}</Text> :
                    <ScrollView>
                        <View style={styles.imageWrap}>
                            <Image source={{ uri: product?.image }}
                                style={styles.heroImage}
                                resizeMode="contain" />
                            <TouchableOpacity style={styles.heartButton} onPress={handleToggleWishlist}>
                                <Text style={styles.heartIcon}>{inWishlist ? '\u2764' : '\u2661'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBlock}>
                            <Text style={styles.title}>{product?.name}</Text>
                            <Text style={styles.subtitle}>Price: $ {product?.price}</Text>
                            <Text style={styles.subtitle}>Description: {product?.description}</Text>
                        </View>
                        <View style={styles.ratingBlock}>
                            <Rating rating={product?.rating} numReviews={product?.numReviews} />
                        </View>
                        <View style={styles.reviewsSection}>
                            <Text style={styles.sectionTitle}>Reviews</Text>
                            {product?.reviews?.length === 0 && <Text>No Reviews</Text>}
                            <View>
                                {product?.reviews?.map((review) => (
                                    <View style={styles.reviewRow} key={review?._id}>
                                        <Text style={styles.reviewName}>{review?.name}</Text>
                                        <Rating rating={review?.rating} />
                                        <Text style={styles.reviewText}>{review?.comment}</Text>
                                        <Text style={styles.reviewText}>{dateCreated}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <Text style={styles.leaveTitle}>Leave a review</Text>
                        <View style={styles.leaveForm}>
                            {userInfo ? (
                                <View style={styles.leaveInner}>
                                    <View style={styles.starRow}>
                                        <StarRate startingValue={5} defaultRating={5} imageSize={30} onFinishRating={onFinishRatingPress} />
                                    </View>
                                    <TextInput placeholder="Enter comment" style={styles.commentInput} value={comment} onChangeText={(e) => setComment(e)} />
                                    <TouchableOpacity onPress={handleSubmit} >
                                        <Text style={styles.submit}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Text>Please <Text style={styles.signInLink} onPress={() => navigation.navigate('SignIn')}>Sign In</Text> to write a review</Text>
                            )}
                        </View>
                    </ScrollView>
                }
            </SafeAreaView>
            <CTA handleAddToCart={handleAddToCart} inCart={inCart} />
        </>
    )
}

const styles = StyleSheet.create({
    safe: {
        backgroundColor: '#ffffff',
    },
    errorBold: {
        color: '#000000',
        fontWeight: 'bold',
    },
    imageWrap: {
        position: 'relative',
    },
    heroImage: {
        height: 384,
        width: '100%',
    },
    heartButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#ffffff',
        borderRadius: 24,
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    heartIcon: {
        fontSize: 28,
        color: '#dc2626',
    },
    titleBlock: {
        paddingLeft: 12,
        paddingTop: 8,
        paddingBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        fontWeight: '600',
    },
    ratingBlock: {
        paddingLeft: 16,
        paddingVertical: 12,
    },
    reviewsSection: {
        paddingTop: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 12,
    },
    reviewRow: {
        paddingLeft: 12,
        paddingVertical: 12,
    },
    reviewName: {
        fontSize: 16,
        fontWeight: '600',
    },
    reviewText: {
        fontSize: 16,
        fontWeight: '600',
    },
    leaveTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 8,
        paddingTop: 4,
    },
    leaveForm: {
        paddingBottom: 144,
    },
    leaveInner: {
        paddingLeft: 4,
        paddingVertical: 12,
    },
    starRow: {
        flexDirection: 'row',
        left: 0,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 6,
        padding: 8,
    },
    submit: {
        color: '#3b82f6',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 8,
    },
    signInLink: {
        color: '#3b82f6',
        fontWeight: 'bold',
    },
});
