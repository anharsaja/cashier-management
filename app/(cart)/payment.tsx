import { useCartContext } from '@/contexts/cartContext';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CalculatorScreen = () => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');
  const [changeMoney, setChangeMoney] = useState<number>(0);

  const { totalQTY, totalPrice } = useCartContext();

  // Fungsi untuk menambahkan angka ke input
  const handlePress = (value: string) => {
    setInputValue((prev) => prev + value);
  };

  // Fungsi untuk menghapus angka terakhir
  const handleDelete = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  // Fungsi untuk menghapus semua input
  const handleClearAll = () => {
    setInputValue('');
  };

  // Fungsi untuk mengirimkan jumlah input (bisa disesuaikan sesuai kebutuhan)
  const handleSubmit = () => {
    alert(
      `Jumlah Uang: Rp ${parseInt(inputValue || '0').toLocaleString('id-ID')}`
    );
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
      {/* Display Input */}
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

      {/* Tombol Angka */}
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

        {/* Tombol Hapus */}
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>⌫</Text>
        </TouchableOpacity>

        {/* Tombol Hapus Semua */}
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={handleClearAll}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>C</Text>
        </TouchableOpacity>

        {/* Tombol Submit */}
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>✔️</Text>
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
