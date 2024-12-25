import { useState, useCallback } from 'react';
import {
	addDoc,
	collection,
	doc,
	writeBatch,
	getDoc,
} from 'firebase/firestore';
import { db } from '@/constants/Config';
import { Alert } from 'react-native';
import { formTransaction } from '@/data/types/form/transaction';
import { router } from 'expo-router';

function useTransaction() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const addTransaction = useCallback(
		async (transactionData: formTransaction) => {
			setLoading(true);
			setError(null);
			const batch = writeBatch(db);

			try {
				// 1. Cek Stock
				const productSnapshots = await Promise.all(
					transactionData.products.map((product) =>
						getDoc(doc(db, 'products', product.product_id))
					)
				);

				// Check stock ada
				const stockValidation = productSnapshots.every((snap, index) => {
					if (!snap.exists()) return false;
					const currentCount = snap.data().count || 0;
					return currentCount >= transactionData.products[index].quantity;
				});

				if (!stockValidation) {
					throw new Error('Insufficient stock for one or more products');
				}

				// 2. Add transaction
				const transactionRef = collection(db, 'transactions');
				const data = {
					...transactionData,
					products: transactionData.products.map(
						({ product_id, ...rest }) => rest
					),
				};

				const newTransactionRef = await addDoc(transactionRef, data);

				// 3. Update all products in batch
				productSnapshots.forEach((snap, index) => {
					const product = transactionData.products[index];
					const currentCount = snap.data()?.count || 0;
					const newCount = currentCount - product.quantity;
					batch.update(doc(db, 'products', product.product_id), {
						count: newCount,
					});
				});

				// 4. Commit batch
				await batch.commit();

				router.push({
					pathname: '/(payment)/success-payment',
					params: {
						createdAt: data.createdAt,
						typePayment: data.typePayment,
						products: JSON.stringify(data.products),
						totalAmount: data.totalAmount.toString(),
						note: data.catatan,
					},
				});
			} catch (err) {
				console.error('Transaction failed:', err);
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
