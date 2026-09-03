import { SafeAreaView, Text, StyleSheet } from 'react-native'
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
        <SafeAreaView style={styles.container}>
            {loading ? <Loader loading={loading} /> : error ? <Text style={styles.error}>{error}</Text> : <ProductCard products={products} />}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    error: {
        color: '#dc2626',
        fontWeight: 'bold',
    },
});
