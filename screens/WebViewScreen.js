import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import WebView from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';
import { useRef } from 'react';
import { useState } from 'react';

function WebviewScreen({ route }) {
    const { url } = route?.params;
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const webviewRef = useRef(null);
    const scrollViewRef = useRef(null);

    const handleWebViewMessage = (event) => {
        if (event.nativeEvent.data === 'goBack') {
            navigation.goBack();
        }
    };

    const webViewStyle = useMemo(
        () => ({
            flex: 1,
            paddingTop: insets.top,
        }),
        [insets.top]
    );

    return (
        <View style={{ flex: 1, marginTop: 45, marginBottom: 5 }}>
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEventThrottle={16}
            >
                <WebView
                    ref={webviewRef}
                    source={{ uri: url }}
                    style={webViewStyle}
                    onMessage={handleWebViewMessage}
                />
            </ScrollView>
        </View>
    );
}


function navigateToWebviewScreen(navigation, params) {
    const { orderId, _id, name, email, isAdmin, token } = params;
    const url = `https://astech-store.onrender.com/order/${orderId}?_id=${_id}&name=${name}&email=${email}&isAdmin=${isAdmin}&token=${token}`;
    // const url = `http://192.168.8.110:3000/order/${orderId}?_id=${_id}&name=${name}&email=${email}&isAdmin=${isAdmin}&token=${token}`;

    navigation.navigate('WebView', { url });
}

export { WebviewScreen, navigateToWebviewScreen };
