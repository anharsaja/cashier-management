import { format } from 'date-fns';
import { db } from '@/constants/Config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ReportProduct } from '@/data/types/form/report';

function useReport() {
	const reportRef = collection(db, 'transactions');
	const [report, setReport] = useState<ReportProduct[]>([]);
	const [status, setStatus] = useState<string>('loading');
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getReportProductDaily = async (date: Date = new Date()) => {
			// Format date sesuai dengan pola di Firestore
			const formatDate = (date: Date) => format(date, 'dd/MM/yyyy HH.mm.ss');

			// Tentukan awal dan akhir hari dalam format string
			const startOfDay = new Date(date);
			startOfDay.setHours(0, 0, 0, 0);
			const startOfDayStr = formatDate(startOfDay);

			const endOfDay = new Date(date);
			endOfDay.setHours(23, 59, 59, 999);
			const endOfDayStr = formatDate(endOfDay);

			try {
				// Query menggunakan string range
				const q = query(
					reportRef,
					where('createdAt', '>=', startOfDayStr),
					where('createdAt', '<=', endOfDayStr)
				);

				const querySnapshot = await getDocs(q);

				if (querySnapshot.empty) {
					setReport([]);
					setStatus('fetched');
					return [];
				}

				const salesProductMap = new Map<string, number>();

				querySnapshot.docs.forEach((doc) => {
					const transaction = doc.data();

					if (Array.isArray(transaction.products)) {
						transaction.products.forEach((product: any) => {
							const currentTotal = salesProductMap.get(product.name) || 0;
							salesProductMap.set(
								product.name,
								currentTotal + product.quantity
							);
						});
					} else {
						console.warn(`Invalid products format in transaction ${doc.id}`);
					}
				});

				const productSales: ReportProduct[] = Array.from(salesProductMap).map(
					([name, count]) => ({
						name,
						count,
					})
				);

				setReport(productSales);
				return productSales;
			} catch (error) {
				console.error('Error fetching report:', error);
				setError(error as Error);
				setStatus('error');
				throw error;
			} finally {
				setStatus('fetched');
			}
		};

		if (status === 'loading') {
			getReportProductDaily();
		}
	}, [status]);

	return {
		error,
		status,
		report,
	};
}

export default useReport;
