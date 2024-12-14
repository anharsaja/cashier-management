import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// Contoh data history transaksi
const transactionHistory = [
  {
    id: '1',
    cashier: 'Kasir A',
    time: '2024-12-14 14:30',
    items: [
      { name: 'Produk 1', price: 10000 },
      { name: 'Produk 2', price: 15000 },
    ],
  },
  {
    id: '2',
    cashier: 'Kasir B',
    time: '2024-12-14 15:00',
    items: [
      { name: 'Produk 3', price: 20000 },
      { name: 'Produk 4', price: 5000 },
    ],
  },
];

export default function TransactionHistory() {
  const [filterCashier, setFilterCashier] = useState('All');

  // Mengfilter transaksi berdasarkan kasir

  // Fungsi untuk menghitung total harga per transaksi
  const calculateTotal = (items: any) =>
    items.reduce((total: number, item: any) => total + item.price, 0);

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.title}>Riwayat Transaksi</Text>

      </View> */}
      <FlatList
        data={transactionHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cashier}>Kasir: {item.cashier}</Text>
            <Text style={styles.time}>Waktu: {item.time}</Text>
            <Text style={styles.itemsHeader}>Barang:</Text>
            {item.items.map((product, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.itemName}>{product.name}</Text>
                <Text style={styles.itemPrice}>Rp {product.price.toLocaleString()}</Text>
              </View>
            ))}
            <Text style={styles.total}>
              Total: Rp {calculateTotal(item.items).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  picker: {
    height: 50,
    width: 200,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cashier: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemsHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 14,
    color: '#555',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 8,
    color: '#000',
  },
});
