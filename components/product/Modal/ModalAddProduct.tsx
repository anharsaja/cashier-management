import useProduct from '@/hooks/useProduct';
import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

function ModalAddProduct({
  visible,
  onClose,
  handlerForm,
  addProduct,
}: {
  visible: boolean;
  onClose: () => void;
  handlerForm: (type: string, text: string) => void;
  addProduct: () => void;
}) {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Tambah Produk</Text>
          <TextInput
            style={styles.input}
            placeholder='Nama Produk'
            onChangeText={(text) => handlerForm('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder='Harga Produk'
            keyboardType='numeric'
            onChangeText={(text) => handlerForm('price', text)}
          />
          <TextInput
            style={styles.input}
            placeholder='Stock Produk'
            keyboardType='numeric'
            onChangeText={(text) => handlerForm('count', text)}
          />
          <View style={styles.modalButtons}>
            <Button
              title='Batal'
              onPress={() => onClose()}
            />
            <Button
              title='Tambah'
              onPress={() => {
                // setModalVisible(false);
                onClose();
                addProduct();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});

export default ModalAddProduct;
