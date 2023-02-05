import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const WarningModal = ({ message, handleSignOut, setIsOpenModal, isOpenModal }) => {

    return (
        <Modal visible={isOpenModal} animationType="fade" transparent={true}>
            <View className="flex h-screen items-center justify-center bg-black bg-opacity-75 mt-2">
                <View className="bg-white p-6 rounded-lg shadow-xl">
                    <Text className="text-xl text-center font-medium mb-6">{message}</Text>
                    <View className="flex justify-between gap-2">
                        <TouchableOpacity className="px-4 py-2 bg-gray-300 rounded-lg" onPress={handleSignOut}>
                            <Text>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="px-4 py-2 bg-blue-700 rounded-lg " onPress={() => setIsOpenModal(false)}>
                            <Text className='text-white'>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


export default WarningModal;

WarningModal.propTypes = {
    message: PropTypes.string.isRequired,
    handleSignOut: PropTypes.func.isRequired,
    setIsOpenModal: PropTypes.func.isRequired,
    isOpenModal: PropTypes.bool.isRequired,
};

