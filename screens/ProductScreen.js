import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
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

export default function ProductScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { params: { productId } } = useRoute();
    const productDetails = useSelector((state) => state.productDetails);
    const { userInfo } = useSelector((state) => state.userSignIn);
    const { loading, error, product } = productDetails;
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const dateCreated = moment(product?.createdAt).format('YYYY-MM-DD');

    // const [qty, setQty] = useState(1);
    //   const userSignin = useSelector((state) => state.userSignin);
    //   const { userInfo } = userSignin;
    //   const productReviewCreate = useSelector((state) => state.productReviewCreate);
    //   const {
    //     loading: loadingReviewCreate,
    //     error: errorReviewCreate,
    //     success: successReviewCreate,
    //   } = productReviewCreate;



    useEffect(() => {
        // if (successReviewCreate) {
        //   window.alert("Review Submitted Successfully");
        //   setRating("");
        //   setComment("");
        //   dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        // }
        dispatch(detailsProduct(productId));
        console.log(rating);
        //   }, [dispatch, productId, successReviewCreate]);
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

    const onFinishRatingPress = (rating) => {
        setRating(rating);
        console.log(rating);
    };


    return (
        <>
            <SafeAreaView className="bg-white">
                <Header />
                {loading ? <Loader loading={loading} /> : error ? <Text className='text-black font-bold'>{error}</Text> :
                    <ScrollView>
                        <View className="relative">
                            <Image source={{ uri: product?.image }}
                                className='h-96 w-full'
                                resizeMode="contain" />
                        </View>
                        <View className='flex gap-2 pl-3'>
                            <Text className="text-2xl font-bold">{product?.name}</Text>
                            <Text className="text-l font-bold">Price: $ {product?.price}</Text>
                            <Text className="text-l font-semibold">Description: {product?.description}</Text>
                        </View>
                        <View className='flex gap-2 pl-4 py-3'>
                            <Rating rating={product?.rating} numReviews={product?.numReviews} />
                        </View>
                        <View className='pt-2'>
                            <Text className="text-xl font-bold pl-3">Reviews</Text>
                            {product?.reviews?.length === 0 && <Text>No Reviews</Text>}
                            <View className=''>
                                {product?.reviews?.map((review) => (
                                    <View className='flex gap-2 pl-3 py-3' key={review?._id}>
                                        <Text className="text-l font-semibold">{review?.name}</Text>
                                        <Rating rating={review?.rating} />
                                        <Text className="text-l font-semibold">{review?.comment}</Text>
                                        <Text className="text-l font-semibold">{dateCreated}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <Text className="text-2xl font-bold pl-2 pt-1">Leave a review</Text>
                        <View className='flex gap-1 pb-36'>
                            {userInfo ? (
                                <View className='flex gap-2 pl-1 py-3'>
                                    <View className='flex-row left-0'>
                                        <StarRate startingValue={5} defaultRating={5} imageSize={30} onFinishRating={onFinishRatingPress} />
                                    </View>
                                    <TextInput placeholder="Enter comment" className="border border-gray-300 rounded-md p-2" value={comment} onChangeText={(e) => setComment(e)} />
                                    <TouchableOpacity onPress={handleSubmit} >
                                        <Text className="text-blue-500 text-lg font-bold pl-2">Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Text>Please <Text className="text-blue-500 font-bold" onPress={() => navigation.navigate('SignIn')}>Sign In</Text> to write a review</Text>
                            )}
                        </View>
                    </ScrollView>
                }
            </SafeAreaView>
            <CTA handleAddToCart={handleAddToCart} />
        </>
    )
}
