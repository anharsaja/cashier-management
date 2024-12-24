import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  ScrollView
} from 'react-native';
import { useNavigation } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { formTransaction } from '@/data/types/form/transaction';
import { useCartContext } from '@/contexts/cartContext';
import useTransaction from '@/hooks/useTransaction';
import ModalNotePayment from '@/components/cart/ModalNotePayment';

type PaymentMethod = 'cash' | 'qris';

function CalculatorScreen () {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');
  const [note, setNote] = useState('')

  const { addTransaction, loading } = useTransaction();

  const [changeMoney, setChangeMoney] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');

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

  let userName: string | null = '';
  if (user) {
    userName = user.displayName;
  }

  const { cartItems } = useCartContext();

  const totalPrice = cartItems
    .map((item) => item.price * item.count)
    .reduce((a, b) => a + b, 0);
  const totalQTY = cartItems.length;

  const handlePress = (value: string) => {
    if (paymentMethod === 'qris') return;
    setInputValue((prev) => prev + value);
  };

  const handleDelete = () => {
    if (paymentMethod === 'qris') return;
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleClearAll = () => {
    if (paymentMethod === 'qris') return;
    setInputValue('');
  };

  const handleCatatanChange = (type: string, text: string) => {
    setNote(text);
  };

  const handleSubmit = async () => {
    if (paymentMethod === 'cash') {
      if (!inputValue || parseInt(inputValue) < totalPrice) {
        alert('Duit e Kurang WOII!!');
        return;
      }
    }

    const transactionData: formTransaction = {
      user_name: userName ? userName : '',
      catatan: note ? note : '',
      status: 'bayar',
      typePayment: paymentMethod,
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
    navigation.setOptions({ headerShown: true, title: 'Pembayaran' });
  }, [navigation]);

  useEffect(() => {
    setChangeMoney(parseInt(inputValue) - totalPrice || 0);
  }, [changeMoney, inputValue]);

  const PaymentMethodComp = () => {
    switch (paymentMethod) {
      case 'cash':
        return (
          <>
            <View style={[styles.displayContainer, { marginTop: 10 }]}>
              <Text style={styles.displayText}>
                {inputValue
                  ? `Rp ${parseInt(inputValue).toLocaleString('id-ID')}`
                  : 'Rp 0'}
              </Text>
            </View>

            <View style={[styles.total, { marginBottom: 10 }]}>
              <Text style={{ fontSize: 18, fontWeight: 'medium', textAlign: 'center' }}>
                Kembalian:
              </Text>
              <Text style={{ fontSize: 18, fontWeight: 'medium', textAlign: 'center' }}>
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
                onPress={() => setModalVisible(true)}
              >
                <Text style={[styles.buttonText, { color: '#fff' }]}>
                  {loading ? 'otw' : 'Pay'}
                </Text>
              </TouchableOpacity>
            </View>
            
          </>
        );
      case 'qris':
        return (
          <View style={styles.qrisContainer}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png' }}
              style={styles.qrCode}
            />
            <Text style={styles.qrisText}>
              Silakan scan QR Code di atas untuk melakukan pembayaran
            </Text>
            <Text style={styles.qrisAmount}>
              Total: Rp {totalPrice.toLocaleString('id-ID')}
            </Text>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.confirmButtonText}>
                {loading ? 'Memproses...' : 'Konfirmasi Pembayaran'}
              </Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.paymentSelector}>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'cash' && styles.paymentOptionActive,
          ]}
          onPress={() => setPaymentMethod('cash')}
        >
          <Text style={[
            styles.paymentOptionText,
            paymentMethod === 'cash' && styles.paymentOptionTextActive,
          ]}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'qris' && styles.paymentOptionActive,
          ]}
          onPress={() => setPaymentMethod('qris')}
        >
          <Text style={[
            styles.paymentOptionText,
            paymentMethod === 'qris' && styles.paymentOptionTextActive,
          ]}>QRIS</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.total}>
        <Text style={styles.priceTotal}>Total Item: {totalQTY}</Text>
        <Text style={styles.quantityTotal}>
          Total: Rp {totalPrice.toLocaleString('id-ID')}
        </Text>
      </View>


      {PaymentMethodComp()}
      <ModalNotePayment
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        catatan={handleCatatanChange}
        submit={handleSubmit}
      />
    </ScrollView>
  );
};

export default CalculatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  total: {
    marginTop:15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
  },
  priceTotal: {
    fontSize: 18,
    fontWeight: 'medium',
  },
  quantityTotal: {
    fontSize: 18,
    fontWeight: 'medium',
  },
  paymentSelector: {
    flexDirection: 'row',
    marginVertical: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
  },
  paymentOption: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  paymentOptionActive: {
    backgroundColor: '#A7D477',
  },
  paymentOptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paymentOptionTextActive: {
    color: '#fff',
  },
  displayContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 0
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
  qrisContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
  },
  qrCode: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  qrisText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  qrisAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#A7D477',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});