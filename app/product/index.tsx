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
import WrapperScreen from '@/components/WrapperScreen';

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
    <WrapperScreen>
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
    </WrapperScreen>
  );
}

export default ProductScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
