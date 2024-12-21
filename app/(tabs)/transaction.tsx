import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Product } from '@/data/types/model/product';
import React, { useCallback, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { useCartContext } from '@/contexts/cartContext';
import fetchProducts from '@/hooks/useFetchProducts';
import { Colors } from '@/constants/Colors';
import { router, useFocusEffect } from 'expo-router';
import Search from '@/components/Search';

export default function TransactionScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { cartItems, incrementItem, decrementItem } = useCartContext();

  const handleAddToCart = (product: Product) => {
    incrementItem(product);
  };

  const handleRemoveFromCart = (product: Product) => {
    decrementItem(product);
  };

  const handleFetchProduct = async () => {
    setLoading(true);
    const data = await fetchProducts();
    if (data) {
      setProducts(data);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleFetchProduct();
    }, [])
  );

  const RenderProduct = ({ item }: { item: Product }) => (
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
    <View style={styles.container}>
      {/* Product List */}
      <ScrollView style={{ marginBottom: 140 }}>
        <ImageBackground
          source={require('@/assets/images/kopi.png')}
          style={styles.headerImage}
          resizeMode='cover'
        >
          <View style={{ paddingHorizontal: 10 }}>
            <Search />
          </View>
        </ImageBackground>
        <Text style={styles.titleList}>Produkmu Moas</Text>
        {loading ? (
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
              size='large'
              color={Colors.primary.base}
            />
            <Text style={{ marginTop: 20, fontSize: 16, color: 'black' }}>
              Sabar, Ojo kedonyan ae
            </Text>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 16 }}>
            {products.map((item: Product, index: number) => (
              <RenderProduct
                item={item}
                key={index}
              />
            ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.paymentContainer}>
        <View style={styles.total}>
          <Text style={styles.priceTotal}>
            Total Barang: {cartItems.length}
          </Text>
          <Text style={styles.quantityTotal}>
            Total Harga:{' '}
            {cartItems
              .map((item) => item.price * item.count)
              .reduce((a, b) => a + b, 0)
              .toLocaleString('id-ID')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => router.push('/(cart)')}
        >
          <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleList: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 16,
  },
});
