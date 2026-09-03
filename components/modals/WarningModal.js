import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const WarningModal = ({ message, handleSignOut, setIsOpenModal, isOpenModal }) => {

    return (
        <Modal visible={isOpenModal} animationType="fade" transparent={true}>
            <View style={styles.backdrop}>
                <View style={styles.card}>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.confirmBtn} onPress={handleSignOut}>
                            <Text>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsOpenModal(false)}>
                            <Text style={styles.cancelLabel}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.75)',
        marginTop: 8,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 8,
    },
    message: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 24,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    confirmBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#d1d5db',
        borderRadius: 8,
    },
    cancelBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#1d4ed8',
        borderRadius: 8,
    },
    cancelLabel: {
        color: '#ffffff',
    },
});

export default WarningModal;

WarningModal.propTypes = {
    message: PropTypes.string.isRequired,
    handleSignOut: PropTypes.func.isRequired,
    setIsOpenModal: PropTypes.func.isRequired,
    isOpenModal: PropTypes.bool.isRequired,
};
