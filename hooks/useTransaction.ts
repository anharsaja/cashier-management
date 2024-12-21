import { useState, useCallback } from 'react';
import { addDoc, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/constants/Config';
import { Alert } from 'react-native';
import { formTransaction } from '@/data/types/form/transaction';
import { router } from 'expo-router';
import { useCartContext } from '@/contexts/cartContext';

function useTransaction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { setCartItems } = useCartContext();

  const addTransaction = useCallback(
    async (transactionData: formTransaction) => {
      setLoading(true);
      setError(null);

      const transactionRef = collection(db, 'transactions');

      try {
        const refTransaction = await addDoc(transactionRef, {
          ...transactionData,
          products: transactionData.products.map(
            ({ product_id, ...rest }) => rest
          ),
        });
        console.info('Transaction added: ', refTransaction.id);

        for (const product of transactionData.products) {
          const productRef = doc(db, 'products', product.product_id);

          const productSnapshot = await getDoc(productRef);
          if (!productSnapshot.exists()) {
            console.warn(`Product with ID ${product.product_id} not found.`);
            continue;
          }

          const currentCount = productSnapshot.data().count || 0;
          const newCount = currentCount - product.quantity;

          if (newCount < 0) {
            console.warn(
              `Not enough stock for product ID ${product.product_id}. Skipping update.`
            );
            continue;
          }

          await updateDoc(productRef, { count: newCount });
          console.info(
            `Updated product ID ${product.product_id}: new count = ${newCount}`
          );
        }

        Alert.alert('BAYARAN', 'Tulung Dipencet', [
          {
            text: 'Back',
            onPress: () => {
              setCartItems([]);
              router.navigate('/(tabs)/transaction');
            },
          },
        ]);
      } catch (err) {
        console.error(
          'Error adding transaction or updating product count:',
          err
        );
        setError(err as Error);
        Alert.alert('Error', 'Failed to complete transaction.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { addTransaction, loading, error };
}

export default useTransaction;
