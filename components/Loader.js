import { View, Text } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';


export default function Loader({ loading }) {
    return (
        <View className='flex-1 justify-center text-center pt-32'>
            <Spinner
                visible={loading}
                textContent={'please wait...'}
                className='text-white'
            />
        </View>
    )
}

Loader.propTypes = {
    loading: PropTypes.bool,
}

Loader.defaultProps = {
    loading: false,
}



