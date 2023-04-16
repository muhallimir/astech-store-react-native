import { View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { saveShippingAddress } from '../actions/cartActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderStepper from '../components/OrderStepper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Form, FormItem } from 'react-native-form-component';
import Header from '../components/Header';

export default function ShippingScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;
    const [fullName, setFullName] = useState(null);
    const [contact, setContact] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [country, setCountry] = useState(null);
    const fullNameInput = useRef(fullName);
    const contactInput = useRef(contact);
    const addressInput = useRef(address);
    const cityInput = useRef(city);
    const postalCodeInput = useRef(postalCode);
    const countryInput = useRef(country);

    useEffect(() => {
        if (!userInfo) {
            navigation.navigate('SignIn');
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        dispatch(
            saveShippingAddress({
                fullName,
                contact,
                address,
                city,
                postalCode,
                country,
            })
        );
        navigation.navigate('Payment');
    };

    return (
        <SafeAreaView>
            <Header />
            <OrderStepper step1 step2 />
            <KeyboardAwareScrollView
                scrollEnabled={true}
                contentContainerStyle={{ paddingBottom: 90 }}

            >
                <View className='mx-2'>
                    <Form buttonStyle={{
                        backgroundColor: '#3b82f6',
                        borderRadius: 5,
                        padding: 10,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                    }}
                        onButtonPress={submitHandler}
                        buttonText="Proceed to Payment"
                    >
                        <FormItem
                            label="Full Name"
                            isRequired
                            value={fullName}
                            onChangeText={(fullName) => setFullName(fullName)}
                            asterik
                            ref={fullNameInput}
                            showErrorIcon={false}
                        />
                        <FormItem
                            label="Contact No."
                            isRequired
                            value={contact}
                            onChangeText={(contact) => setContact(contact)}
                            asterik
                            ref={contactInput}
                            showErrorIcon={false}
                        />
                        <FormItem
                            label="Address"
                            isRequired
                            value={address}
                            onChangeText={(address) => setAddress(address)}
                            asterik
                            ref={addressInput}
                            showErrorIcon={false}
                        />
                        <FormItem
                            label="City"
                            isRequired
                            value={city}
                            onChangeText={(city) => setCity(city)}
                            asterik
                            ref={cityInput}
                            showErrorIcon={false}
                        />
                        <FormItem
                            label="Postal Code"
                            isRequired
                            value={postalCode}
                            onChangeText={(postalCode) => setPostalCode(postalCode)}
                            asterik
                            ref={postalCodeInput}
                            showErrorIcon={false}
                        />
                        <FormItem
                            label="Country"
                            isRequired
                            value={country}
                            onChangeText={(country) => setCountry(country)}
                            asterik
                            ref={countryInput}
                            showErrorIcon={false}
                        />
                    </Form>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )

}