import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

function WebviewScreen({ route }) {
    const { url } = route?.params;
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const handleWebViewMessage = (event) => {
        if (event.nativeEvent.data === 'goBack') {
            navigation.goBack();
        }
    }

    const webViewStyle = useMemo(
        () => ({
            flex: 1,
            paddingTop: insets.top,
        }),
        [insets.top]
    );

    return (
        <View style={{ flex: 1, marginTop: 45, marginBottom: 5 }}>
            <WebView source={{ uri: url }} style={webViewStyle} onMessage={handleWebViewMessage} />
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
