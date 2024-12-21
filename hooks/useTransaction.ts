import { addDoc, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/constants/Config';
import { Alert } from 'react-native';
import { formTransaction } from '@/data/types/form/transaction';

async function addTransaction(transactionData: formTransaction) {
  const transactionRef = collection(db, 'transactions');

  try {
    const refTransaction = await addDoc(transactionRef, transactionData);
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
  } catch (error) {
    console.error('Error adding transaction or updating product count:', error);
    Alert.alert('Error', 'Failed to complete transaction.');
  }
}

export { addTransaction };
