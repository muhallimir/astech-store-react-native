import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Form, FormItem } from 'react-native-form-component';
import { useNavigation } from '@react-navigation/native';
import { register } from '../actions/userActions';
import Loader from '../components/Loader';

export default function RegisterScreen() {
    const navigation = useNavigation();
    const { userSignIn } = useSelector((state) => state);
    const { userInfo, loading, error } = userSignIn;
    const dispatch = useDispatch();
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const userNameInput = useRef(userName);
    const emailInput = useRef(email);
    const passwordInput = useRef(password);
    const confirmPasswordInput = useRef(confirmPassword);

    const navigateToLogin = () => {
        navigation.navigate('SignIn');
    }

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
        } else if (userSignIn.error) {
            alert(error);
        }
        else {
            dispatch(register(userName, email, password));
        }
    }

    useEffect(() => {
        if (userInfo?.name) {
            navigation.navigate('Home');
        }
    }, [userInfo]);

    return (


        <SafeAreaView>
            <Header />
            {loading && <Loader loading={loading} />}
            <View style={styles.titleBlock}>
                <Text style={styles.title}>Create an account</Text>
            </View>
            <View style={styles.formWrap}>
                <Form buttonStyle={{
                    backgroundColor: '#3b82f6',
                    borderRadius: 5,
                    padding: 10,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                }}
                    onButtonPress={handleRegister}
                    buttonText="Sign up"
                >
                    <FormItem
                        label="Username"
                        isRequired
                        value={userName}
                        onChangeText={(userName) => setUserName(userName)}
                        asterik
                        ref={userNameInput}
                        showErrorIcon={false}
                    />
                    <FormItem
                        label="Email"
                        isRequired
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        asterik
                        ref={emailInput}
                        showErrorIcon={false}
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
                    />
                    <FormItem
                        label="Confirm Password"
                        isRequired
                        value={confirmPassword}
                        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                        asterik
                        ref={confirmPasswordInput}
                        showErrorIcon={false}
                        secureTextEntry={true}
                    />
                </Form>
            </View>
            <View style={styles.footerBlock}>
                <View>
                    <Text>Already have an account?</Text>
                </View>
                <TouchableOpacity onPress={navigateToLogin}>
                    <Text style={styles.signinLink}>Sign in here</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    titleBlock: {
        marginTop: 12,
        alignItems: 'center',
    },
    title: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
    },
    formWrap: {
        marginHorizontal: 8,
    },
    footerBlock: {
        marginTop: 12,
        alignItems: 'center',
    },
    signinLink: {
        color: '#1e3a8a',
        fontSize: 16,
    },
});
