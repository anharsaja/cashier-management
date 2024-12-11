import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { products as productsData, Product } from '@/data/dummyProduct';
import { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { BlurView } from 'expo-blur';

export default function TransactionScreen() {
  const [products, setProducts] = useState<Product[]>(productsData);

  const [total, setTotal] = useState(0)
  const [totalharga, setTotalharga] = useState(0)


  const incrementCount = (id: number) => {
    const data = products.map((item) => {
      const harga = item.price
      if (item.id == id) {
        setTotal(total + 1)
        setTotalharga(totalharga + harga)
        return {
          ...item,
          count: item.count + 1
        }
      }
      else {
        return item;
      }
    })
    setProducts(data)
  };

  const decrementCount = (id: number) => {
    const data = products.map((item) => {    
      const harga = item.price
      if (item.id == id && item.count > 0) {
        setTotal(total - 1);
        setTotalharga(totalharga - harga)
        return {
          ...item,
          count: item.count - 1
        }
      }
      else {
        return item;
      }
    })
    setProducts(data)
  }



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
          onPress={() => decrementCount(item.id)}
        >
          <Entypo
            name='minus'
            size={18}
            color={'#D17842'}
          />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.count}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => incrementCount(item.id)}
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
      <Image
        source={require('@/assets/images/kopi.png')}
        style={styles.headerImage}
        resizeMode='cover'
      />
      <Text style={styles.titleList}>Produkmu Moas</Text>
      <FlatList
        data={products}
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
          <Text style={styles.priceTotal}>Total Barang: {total}</Text>
          <Text style={styles.quantityTotal}>Total Harga: {totalharga.toLocaleString('id-ID')}</Text>
        </View>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </BlurView>
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
});
