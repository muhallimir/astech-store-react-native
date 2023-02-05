import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Form, FormItem } from 'react-native-form-component';
import { useNavigation } from '@react-navigation/native';
import { signIn } from '../actions/userActions';
import Loader from '../components/Loader';

export default function SignInScreen() {
    const navigation = useNavigation();
    const { userSignIn } = useSelector((state) => state);
    const { userInfo, loading, error } = userSignIn;
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const emailInput = useRef(email);
    const passwordInput = useRef(password);
    const dispatch = useDispatch();

    const handleSignIn = () => {
        if (userSignIn.error) {
            alert(error);
        } else {
            dispatch(signIn(email, password));
        }
    }

    useEffect(() => {
        if (userInfo?.name) {
            navigation.navigate('Home');
        }
    }, [userInfo]);

    const navigateToRegister = () => {
        navigation.navigate('Register');
    }

    return (
        <SafeAreaView>
            <Header />
            {loading && <Loader loading={loading} />}
            <View className='flex flex-col items-center justify-center w-full mt-3'>
                <Text className='text-black font-bold text-2xl mb-5'>Sign in to your account</Text>
            </View>
            <View className='mx-2'>
                <Form onButtonPress={() => handleSignIn()}
                    buttonStyle={{
                        backgroundColor: '#3b82f6',
                        borderRadius: 5,
                        padding: 10,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                    }}
                    buttonText="Sign in"
                >
                    <FormItem
                        label="Email"
                        isRequired
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        asterik
                        ref={emailInput}
                        showErrorIcon={false}
                        errorBorderColor="none"
                    />
                    <FormItem
                        label="Password"
                        isRequired
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        asterik
                        ref={passwordInput}
                        showErrorIcon={false}
                        secureTextEntry={true}
                        errorBorderColor="none"
                    />
                </Form>
            </View>
            <View className='flex flex-col items-center justify-center w-full mt-3'>
                <View className='flex-row text-left'>
                    <Text>Don't have an account?</Text>
                </View>
                <TouchableOpacity onPress={navigateToRegister}>
                    <Text className='text-blue-900 text-base'>Register here</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
