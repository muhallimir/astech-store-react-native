import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import { TailwindProvider } from 'tailwindcss-react-native';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHitoryScreen from './screens/OrderHitoryScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import SignInScreen from './screens/SignInScreen';
import store from './store';
import { WebviewScreen } from './screens/WebViewScreen';


export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="ProductScreen" component={ProductScreen} />
              <Stack.Screen name="CartScreen" component={CartScreen} />
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Shipping" component={ShippingScreen} />
              <Stack.Screen name="Payment" component={PaymentScreen} />
              <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
              <Stack.Screen name="OrderHistory" component={OrderHitoryScreen} />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                headerShown: false,
                presentation: "modal",
              }}
            >
              <Stack.Screen name="WebView" component={WebviewScreen} />
            </Stack.Group>
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}