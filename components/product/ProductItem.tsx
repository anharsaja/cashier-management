import { Colors } from '@/constants/Colors';
import { Product } from '@/data/dummyProduct';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ModalEditProduct from './Modal/ModalEditProduct';
import { FormProduct } from '@/data/types/form/product';

const RenderProduct = ({
  item,
  onEdit,
  onDelete,
  form,
  handleForm,
}: // editProduct,
  {
    item: Product; // Menyimpan data produk
    onEdit: (id: string) => void; // Fungsi untuk mengedit produk
    onDelete: (id: string) => void;
    form: FormProduct;
    handleForm: (type: string, text: string) => void;
    // editProduct: (id: string) => void;
  }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const product: Product = {
    name: item.name,
    price: item.price,
    id: item.id,
    count: item.count,
  };

  useEffect(() => {
    handleForm('name', product.name);
    handleForm('price', product.price.toString());
    handleForm('count', product.count.toString());
  }, []);

  return (
    <View style={styles.productContainer}>
      <View style={styles.cardText}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(item.price)}
        </Text>

        <Text style={styles.productPrice}>
          Stock: {item.count}
        </Text>
      </View>
      <View
        style={{
          gap: 2,
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => onDelete(item.id)}
        >
          <MaterialIcons
            name='delete'
            size={28}
            color={Colors.primary.textPrimary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons
            name='edit'
            size={28}
            color={Colors.primary.textPrimary}
          />
        </TouchableOpacity>
      </View>
      <ModalEditProduct
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        editProduct={onEdit}
        handleForm={handleForm}
        product={product}
        form={form}
      />
    </View>
  );
};

export default RenderProduct;

const styles = StyleSheet.create({
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
});
