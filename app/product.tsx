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
import fetchProducts from '@/hooks/useFetchProducts';
import { Product } from '@/data/dummyProduct';
import { Entypo } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import useProduct from '@/hooks/useProduct';

const renderProduct = ({ item }: { item: Product }) => (
  <View style={styles.productContainer}>
    <View style={styles.cardText}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>
        {new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(item.price)}
      </Text>
    </View>
  </View>
);

function ProductScreen() {
  const { products, status } = useProduct();
  const [modalVisible, setModalVisible] = useState(false);

  if (status == 'loading') {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <ActivityIndicator
          size='small'
          color={Colors.primary.base}
        />
        <Text style={{ marginTop: 20, fontSize: 16, color: 'black' }}>
          Mengambil data...
        </Text>
      </View>
    );
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Tambah Produk</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tambah Produk</Text>
            <TextInput
              style={styles.input}
              placeholder='Nama Produk'
              // value={productName}
              // onChangeText={setProductName}
            />
            <TextInput
              style={styles.input}
              placeholder='Harga Produk'
              keyboardType='numeric'
              // value={productPrice}
              // onChangeText={setProductPrice}
            />
            <View style={styles.modalButtons}>
              <Button
                title='Batal'
                onPress={() => setModalVisible(false)}
              />
              <Button
                title='Tambah'
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#00000040',
    shadowOpacity: 0.75,
    shadowOffset: { width: 2, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 9,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
  paymentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20, // Membuat sudut melengkung
    overflow: 'hidden', // Untuk memastikan isi tetap berada di dalam sudut
    padding: 16,
    elevation: 1, // Bayangan untuk Android
    shadowColor: '#00000040',
    shadowOpacity: 0.8,
    shadowOffset: { width: 2, height: 5 },
    shadowRadius: 10,
    // elevation: 10,
  },
  total: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  priceTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  quantityTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#666',
  },
  paymentButton: {
    backgroundColor: '#D17842',
    color: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  headerImage: {
    width: '100%',
    height: 250, // Adjust the height as needed
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },

  titleList: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 16,
  },
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
