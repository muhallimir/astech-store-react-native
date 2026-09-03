import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';


export default function Loader({ loading, webview, payment }) {
    return (
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={webview ? 'loading...' : payment ? 'processing..' : 'please wait...'}
                textStyle={styles.spinnerText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 128,
    },
    spinnerText: {
        color: '#ffffff',
    },
});

Loader.propTypes = {
    loading: PropTypes.bool,
    webview: PropTypes.bool,
    payment: PropTypes.bool,
}

Loader.defaultProps = {
    loading: false,
    webview: false,
    payment: false,
}
