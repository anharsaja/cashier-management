import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Product } from '@/data/dummyProduct';
import { Colors } from '@/constants/Colors';
import useProduct from '@/hooks/useProduct';
import LoadingScreen from '@/components/LoadingScreen';
import ModalAddProduct from '@/components/product/Modal/ModalAddProduct';
import RenderProduct from '@/components/product/ProductItem';
import AddBtnProduct from '@/components/product/Btn/AddBtn';

function ProductScreen() {
  const {
    products,
    status,
    form,
    handlerForm,
    addProduct,
    editProduct,
    deleteProduct,
  } = useProduct();
  const [modalVisible, setModalVisible] = useState(false);

  if (status == 'loading') {
    return <LoadingScreen message='Sek goleki product...' />;
  }

  if (status == 'loading-add') {
    return <LoadingScreen message='Sek nambah product...' />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primary.textPrimary,
      }}
    >
      <Text
        style={{
          marginTop: 20,
          marginHorizontal: 30,
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        All Product
      </Text>
      <AddBtnProduct onClick={() => setModalVisible(true)} />
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <RenderProduct
            item={item}
            onEdit={editProduct} // Mengirimkan fungsi edit ke komponen RenderProduct
            onDelete={deleteProduct} // Mengirimkan fungsi delete ke komponen RenderProduct
            handleForm={handlerForm}
            form={form}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <ModalAddProduct
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        handlerForm={handlerForm}
        addProduct={addProduct}
      />
    </View>
  );
}

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  cardText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#A66E38',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D17842',
    height: 35,
    borderRadius: 100,
    width: 35,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A19',
  },
});
