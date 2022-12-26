import { SafeAreaView, Text } from 'react-native'
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listProducts } from '../actions/productActions';
import Loader from './Loader';


export default function Products() {

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);

    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <SafeAreaView className="flex-1">
            {loading ? <Loader loading={loading} /> : error ? <Text className='text-black font-bold'>{error}</Text> : <ProductCard products={products} />
            }
        </SafeAreaView >
    )
}