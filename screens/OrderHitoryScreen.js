import { View, Text, TouchableOpacity } from 'react-native'
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
        console.log('orderId:', orderId);
    }


    const tableData = orders?.map((order) => [
        orderDate(order),
        `$${order.totalPrice.toFixed(2)}`,
        order.isPaid ? order.paidAt : 'No',
        order.isDelivered ? order.deliveredAt : 'No',
        <TouchableOpacity onPress={() => handleWebView(order._id)} >
            <Text className='text-blue-500 font-bold'>Details</Text>
        </TouchableOpacity>
    ]);

    useEffect(() => {
        dispatch(myOrderHistory());
    }, [dispatch]);



    return (
        <SafeAreaView>
            <Header />
            <View>
                {loading ? <Loader loading={loading} /> : error ? <Text className='text-red font-bold'>{error}</Text> :
                    <Table>
                        <Row data={['Date', 'Total', 'Paid', 'Delivered', 'Action']} className='flex-row justify-between items-center text-center bg-gray-200 p-2' textStyle='font-bold' />
                        {tableData.map((rowData, index) => (
                            <Row
                                key={index}
                                data={rowData}
                                className='flex-row justify-between items-center bg-gray-200 p-2 rounded-md my-2'
                                textStyle='mr-2 flex-1 flex-wrap font-normal'
                            />
                        ))}
                    </Table>}
            </View >
        </SafeAreaView >
    )
}