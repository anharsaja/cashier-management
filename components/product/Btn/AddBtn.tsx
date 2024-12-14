import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

function AddBtnProduct({ onClick }: { onClick: () => void }) {
  return (
    <TouchableOpacity
      style={styles.addButton}
      onPress={onClick}
    >
      <Text style={styles.addButtonText}>Tambah Produk</Text>
    </TouchableOpacity>
  )
}

export default AddBtnProduct;

const styles = StyleSheet.create({
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
})