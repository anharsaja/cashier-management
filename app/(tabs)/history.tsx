import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function HistoryScreen() {
  // State untuk menyimpan count
  const [count, setCount] = useState(0);

  // Fungsi untuk menambah count
  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Count: {count}</Text>
      <Button
        title='Add Count'
        onPress={incrementCount}
      />
      <Button
        title='Rem Count'
        onPress={decrementCount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // Warna latar belakang hitam
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ffffff', // Warna teks putih agar kontras
  },
});
