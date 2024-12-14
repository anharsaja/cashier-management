import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Product } from '@/data/dummyProduct';
import { useCartContext } from '@/contexts/cartContext';
import { BlurView } from 'expo-blur';
import { Stack } from 'expo-router';
import React from 'react';

export default function CartScreen() {
  const { cartItems, totalQTY, totalPrice, incrementItem, decrementItem } =
    useCartContext();

  const handleAddToCart = (product: Product) => {
    incrementItem(product);
  };

  const handleRemoveFromCart = (product: Product) => {
    decrementItem(product);
  };

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
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleRemoveFromCart(item)}
        >
          <Entypo
            name='minus'
            size={18}
            color={'#D17842'}
          />
        </TouchableOpacity>
        <Text style={styles.quantityText}>
          {cartItems.find((cartItem) => cartItem.id === item.id)?.count || 0}
        </Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleAddToCart(item)}
        >
          <Entypo
            name='plus'
            size={18}
            color={'#D17842'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <React.Fragment>
      <Stack.Screen
        options={{
          title: 'Cart',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'black',
          },
        }}
      />
      <View style={styles.container}>
        <Text style={styles.titleList}>Ojo Lali Kon Bayar</Text>
        <FlatList
          data={cartItems}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContainer}
        />
        {/* Payment Section */}
        <BlurView
          intensity={80}
          tint='light'
          style={styles.paymentContainer}
        >
          <View style={styles.total}>
            <Text style={styles.priceTotal}>Total Barang: {totalQTY}</Text>
            <Text style={styles.quantityTotal}>
              Total Harga: {totalPrice.toLocaleString('id-ID')}
            </Text>
          </View>
          <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentButtonText}>Bayaren</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </React.Fragment>
  );
}

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
    fontSize: 22,
    fontWeight: 'bold',
    padding: 18,
    fontFamily: 'Inter',
  },
});
