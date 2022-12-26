import { Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { detailsProduct } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../components/Loader';
import Rating from '../components/Rating';



export default function ProductScreen() {
    const dispatch = useDispatch();
    const { params: { productId } } = useRoute();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    console.log('product', product);


    // const [qty, setQty] = useState(1);
    //   const userSignin = useSelector((state) => state.userSignin);
    //   const { userInfo } = userSignin;
    //   const productReviewCreate = useSelector((state) => state.productReviewCreate);
    //   const {
    //     loading: loadingReviewCreate,
    //     error: errorReviewCreate,
    //     success: successReviewCreate,
    //   } = productReviewCreate;

    // const [rating, setRating] = useState(0);
    // const [comment, setComment] = useState("");

    useEffect(() => {
        // if (successReviewCreate) {
        //   window.alert("Review Submitted Successfully");
        //   setRating("");
        //   setComment("");
        //   dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        // }
        dispatch(detailsProduct(productId));
        //   }, [dispatch, productId, successReviewCreate]);
    }, [dispatch, productId]);

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     if (comment && rating) {
    //         dispatch(
    //             createReview(productId, { rating, comment, name: userInfo.name })
    //         );
    //     } else {
    //         alert("Please enter comment and rating");
    //     }
    // };

    // const handleAddtoCart = () => {
    //     dispatch(addToCart(product._id, qty));
    // };

    // const handleBuyNow = () => {
    //     props.history.push(`/cart/${productId}?qty=${qty}`);
    //     dispatch(addToCart(productId));
    //     dispatch(addToCart(product._id, qty));
    // };

    return (
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
                </ScrollView>
            }
        </SafeAreaView>
    )
}
