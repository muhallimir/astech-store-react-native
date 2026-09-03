import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';


export default function OrderStepper({ step1, step2, step3, step4 }) {
    return (
        <View style={styles.container}>
            <View style={styles.stepOuter}>
                <View style={step1 ? styles.stepActive : styles.stepInactive}>
                    <Text style={step1 ? styles.textActive : styles.textBold}>Order</Text>
                </View>
            </View>
            <View style={styles.stepOuter}>
                <View style={step2 ? styles.stepActive2 : styles.stepInactive}>
                    <Text style={step2 ? styles.textActive : styles.textBold}>Shipping</Text>
                </View>
            </View>
            <View style={styles.stepOuter}>
                <View style={step3 ? styles.stepActiveNoPad : styles.stepInactive}>
                    <Text style={step3 ? styles.textActive : styles.textNormal}>Payment</Text>
                </View>
            </View>
            <View style={styles.stepOuter}>
                <View style={step4 ? styles.stepActiveNoPad : styles.stepInactive}>
                    <Text style={step4 ? styles.textActive : styles.textNormal}>Checkout</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        marginTop: 8,
        marginHorizontal: 4,
    },
    stepOuter: {
        flex: 1,
    },
    stepActive: {
        padding: 8,
        borderTopWidth: 4,
        borderColor: '#1e3a8a',
        paddingLeft: 20,
    },
    stepActive2: {
        padding: 8,
        borderTopWidth: 4,
        borderColor: '#1e3a8a',
        paddingLeft: 32,
    },
    stepActiveNoPad: {
        padding: 8,
        borderTopWidth: 4,
        borderColor: '#1e3a8a',
    },
    stepInactive: {
        padding: 8,
        borderTopWidth: 4,
        borderColor: '#9ca3af',
    },
    textActive: {
        color: '#1e3a8a',
        fontWeight: 'bold',
    },
    textBold: {
        fontWeight: 'bold',
    },
    textNormal: {
        fontWeight: 'normal',
    },
});

OrderStepper.propTypes = {
    step1: PropTypes.bool,
    step2: PropTypes.bool,
    step3: PropTypes.bool,
    step4: PropTypes.bool
}

OrderStepper.defaultProps = {
    step1: false,
    step2: false,
    step3: false,
    step4: false
}
