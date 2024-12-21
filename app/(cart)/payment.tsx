import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { formTransaction } from '@/data/types/form/transaction';
import { useCartContext } from '@/contexts/cartContext';
import useTransaction from '@/hooks/useTransaction';

const CalculatorScreen = () => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');
  const { addTransaction, loading } = useTransaction();
  const [changeMoney, setChangeMoney] = useState<number>(0);
  const auth = getAuth();
  const user = auth.currentUser;
  const now = new Date();
  const formattedData = now.toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  let userId: string | undefined = '';
  let userName: string | null = '';
  if (user) {
    userId = user.uid;
    userName = user.displayName;
  }

  const { cartItems } = useCartContext();

  const totalPrice = cartItems
    .map((item) => item.price * item.count)
    .reduce((a, b) => a + b, 0);
  const totalQTY = cartItems.length;

  const handlePress = (value: string) => {
    setInputValue((prev) => prev + value);
  };

  const handleDelete = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleClearAll = () => {
    setInputValue('');
  };

  const handleSubmit = async () => {
    if (!inputValue || parseInt(inputValue) < totalPrice) {
      alert('Duit e Kurang WOII!!');
      return;
    }

    const transactionData: formTransaction = {
      user_name: userName ? userName : '',
      status: 'bayar',
      typePayment: 'cash',
      totalAmount: totalPrice,
      createdAt: formattedData,
      products: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.count,
        name: item.name,
        price: item.price,
      })),
    };

    await addTransaction(transactionData);
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: 'Part Menegangkan' });
  }, [navigation]);

  useEffect(() => {
    setChangeMoney(parseInt(inputValue) - totalPrice || 0);
  }, [changeMoney, inputValue]);

  return (
    <View style={styles.container}>
      <View style={styles.total}>
        <Text style={styles.priceTotal}>Seng Ditumbas: {totalQTY}</Text>
        <Text style={styles.quantityTotal}>
          Total Harga: {totalPrice.toLocaleString('id-ID')}
        </Text>
      </View>
      <View style={[styles.displayContainer, { marginTop: 14 }]}>
        <Text style={styles.displayText}>
          {inputValue
            ? `Rp ${parseInt(inputValue).toLocaleString('id-ID')}`
            : 'Rp 0'}
        </Text>
      </View>

      <View style={[styles.total, { marginBottom: 50 }]}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
          Balikno:
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
          {`Rp ${changeMoney.toLocaleString('id-ID')}`}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', '000'].map(
          (item) => (
            <TouchableOpacity
              key={item}
              style={styles.button}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          )
        )}

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>⌫</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={handleClearAll}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>C</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            {loading ? 'otw' : '✔️'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CalculatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  total: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
  },
  priceTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quantityTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  displayContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 35,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#ff6347',
  },
  clearButton: {
    backgroundColor: '#dc3545',
  },
  submitButton: {
    backgroundColor: '#A7D477',
  },
});
