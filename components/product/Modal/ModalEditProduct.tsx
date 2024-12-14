import { Product } from '@/data/dummyProduct';
import { FormProduct } from '@/data/types/form/product';
import useProduct from '@/hooks/useProduct';
import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

function ModalEditProduct({
  visible,
  onClose,
  handleForm,
  editProduct,
  product,
  form,
}: {
  visible: boolean;
  product: Product;
  onClose: () => void;
  handleForm: (type: string, text: string) => void;
  editProduct: (id: string) => void;
  form: FormProduct;
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
          <Text style={styles.modalTitle}>Edit Produk</Text>
          <TextInput
            style={styles.input}
            placeholder='Nama Produk'
            value={form.name}
            onChangeText={(text) => handleForm('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder='Harga Produk'
            keyboardType='numeric'
            value={form.price.toString()}
            onChangeText={(text) => handleForm('price', text)}
          />
          <TextInput
            style={styles.input}
            placeholder='Stok Produk'
            keyboardType='numeric'
            value={form.count.toString()}
            onChangeText={(text) => handleForm('count', text)}
          />
          <View style={styles.modalButtons}>
            <Button
              title='Batal'
              onPress={() => onClose()}
            />
            <Button
              title='Save'
              onPress={() => {
                // setModalVisible(false);
                onClose();
                editProduct(product.id);
                console.log(product.id);
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

export default ModalEditProduct;
