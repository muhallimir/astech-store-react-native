import { View, Text } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';


export default function Loader({ loading, webview, payment }) {
    return (
        <View className='flex-1 justify-center text-center pt-32'>
            <Spinner
                visible={loading}
                textContent={webview ? 'loading...' : payment ? 'processing..' : 'please wait...'}
                className='text-white'
            />
        </View>
    )
}

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



