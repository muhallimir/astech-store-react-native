import { SafeAreaView, Text, StyleSheet, View } from 'react-native'
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { listProducts } from '../actions/productActions';
import Loader from './Loader';


export default function Products({ search = '', category = 'All', sortBy = 'featured' }) {

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);

    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const filteredProducts = useMemo(() => {
        if (!Array.isArray(products)) {
            return [];
        }
        const term = search.trim().toLowerCase();
        let filtered = products.filter((product) => {
            const matchesCategory = !category || category === 'All' || product.category === category;
            const matchesSearch = !term || (product.name && product.name.toLowerCase().includes(term));
            return matchesCategory && matchesSearch;
        });
        // Apply sort
        if (sortBy && sortBy !== 'featured') {
            filtered = [...filtered].sort((a, b) => {
                switch (sortBy) {
                    case 'price_asc': return (a.price || 0) - (b.price || 0);
                    case 'price_desc': return (b.price || 0) - (a.price || 0);
                    case 'rating': return (b.rating || 0) - (a.rating || 0);
                    case 'name': return (a.name || '').localeCompare(b.name || '');
                    default: return 0;
                }
            });
        }
        return filtered;
    }, [products, search, category, sortBy]);

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <Loader loading={loading} />
            ) : error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <View>
                    <ProductCard products={filteredProducts} />
                    {!loading && filteredProducts.length === 0 && (
                        <Text style={styles.empty}>No products match your search</Text>
                    )}
                </View>
            )}
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
    empty: {
        color: '#000000',
        fontWeight: 'bold',
        padding: 16,
    },
});
