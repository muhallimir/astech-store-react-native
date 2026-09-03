import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { myOrderHistory } from '../actions/orderActions';
import Loader from '../components/Loader';
import { Table, Row } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';
import { navigateToWebviewScreen } from './WebViewScreen';

export default function OrderHitoryScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { userInfo: { _id, name, email, isAdmin, token } } = useSelector(({ userSignIn }) => userSignIn);
    const myPurchase = useSelector((state) => state.myPurchase);
    const { error, loading, orders } = myPurchase;

    const orderDate = (order) => {
        const date = new Date(order.createdAt);
        return date.toLocaleDateString();
    }

    const handleWebView = (orderId) => {
        navigateToWebviewScreen(navigation, { orderId, _id, name, email, isAdmin, token });
    }

    const tableData = orders?.map((order) => [
        orderDate(order),
        `$${order.totalPrice.toFixed(2)}`,
        order.isPaid ? order.paidAt : 'No',
        order.isDelivered ? order.deliveredAt : 'No',
        <TouchableOpacity onPress={() => handleWebView(order._id)} >
            <Text style={styles.detailsLink}>Details</Text>
        </TouchableOpacity>
    ]);

    useEffect(() => {
        dispatch(myOrderHistory());
    }, [dispatch]);

    return (
        <SafeAreaView>
            <Header />
            <View style={styles.container}>
                {loading ? <Loader loading={loading} /> : error ? <Text style={styles.error}>{error}</Text> :
                    <Table>
                        <Row data={['Date', 'Total', 'Paid', 'Delivered', 'Action']} style={styles.headerRow} textStyle={styles.headerText} />
                        {tableData.map((rowData, index) => (
                            <Row
                                key={index}
                                data={rowData}
                                style={styles.bodyRow}
                                textStyle={styles.bodyText}
                            />
                        ))}
                    </Table>}
            </View >
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        width: '100%',
    },
    error: {
        color: '#dc2626',
        fontWeight: 'bold',
    },
    detailsLink: {
        color: '#3b82f6',
        fontWeight: 'bold',
    },
    headerRow: {
        backgroundColor: '#e5e7eb',
        padding: 8,
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bodyRow: {
        backgroundColor: '#e5e7eb',
        padding: 8,
        borderRadius: 6,
        marginVertical: 8,
    },
    bodyText: {
        fontWeight: 'normal',
        flexWrap: 'wrap',
    },
});
