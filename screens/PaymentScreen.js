import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import { RadioButton } from 'react-native-paper';
import OrderStepper from '../components/OrderStepper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';


const PaymentScreen = () => {
    const [checked, setChecked] = useState('Paypal');
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const checkoutHandler = () => {
        dispatch(savePaymentMethod(checked));
        navigation.navigate('PlaceOrder');
    }

    return (
        <SafeAreaView>
            <Header />
            <OrderStepper step1 step2 step3 />
            <View style={styles.container}>
                <View style={styles.optionRow}>
                    <RadioButton
                        theme={{ colors: { primary: '#3b82f6' } }}
                        value="Paypal"
                        status={checked === 'Paypal' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Paypal')}
                    />
                    <Text style={styles.optionLabel}>Paypal</Text>
                </View>
                <View style={styles.optionRow}>
                    <RadioButton
                        theme={{ colors: { primary: '#3b82f6' } }}
                        value="Stripe"
                        status={checked === 'Stripe' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Stripe')}
                        disabled
                    />
                    <Text style={styles.optionLabel}>Stripe (Coming soon..)</Text>
                </View>
                <TouchableOpacity
                    style={styles.cta}
                    onPress={checkoutHandler}
                >
                    <Text style={styles.ctaLabel}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginTop: 160,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cta: {
        backgroundColor: '#1e3a8a',
        padding: 12,
        borderRadius: 6,
        marginTop: 20,
        alignItems: 'center',
    },
    ctaLabel: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PaymentScreen
