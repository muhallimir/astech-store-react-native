import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Electronics from "../assets/images/electronics.png";
import Gaming from "../assets/images/gaming.png";
import Pants from "../assets/images/pants.png";
import Shirts from "../assets/images/shirts.png";

export default function Categories() {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.item}>
                    <Image source={Electronics} style={styles.icon} />
                    <Text style={styles.label}>Electronics</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.item}>
                    <Image source={Gaming} style={styles.icon} />
                    <Text style={styles.label}>Gaming</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.item}>
                    <Image source={Pants} style={styles.icon} />
                    <Text style={styles.label}>Pants</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.item}>
                    <Image source={Shirts} style={styles.icon} />
                    <Text style={styles.label}>Shirts</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 48,
        paddingHorizontal: 28,
        alignSelf: 'center',
        zIndex: 10,
        marginTop: -144,
    },
    item: {
        alignItems: 'center',
    },
    icon: {
        width: 48,
        height: 48,
    },
    label: {
        color: '#000000',
        fontWeight: 'bold',
    },
});
