import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router, Route } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useCartContext } from '@/contexts/cartContext';

function SuccessScreen() {
	const { setCartItems } = useCartContext();
	const params = useLocalSearchParams<{
		createdAt?: string;
		typePayment?: string;
		products?: string;
		totalAmount?: string;
		note?: string;
	}>();

	const createdAt = params.createdAt || 'Unknown';
	const totalAmount = params.totalAmount ? parseInt(params.totalAmount) : 0;
	const typePayment = params.typePayment || 'Unknown';
	const note = params.note || 'Unknown';

	const products = params.products
		? (JSON.parse(params.products) as Array<{
				name: string;
				price: number;
				quantity: number;
		  }>)
		: [];

	const handleBackToHome = () => {
		router.navigate('/(tabs)/transaction');
		setCartItems([]);
	};

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.iconContainer}>
					<View style={styles.iconCircle}>
						<Feather
							name="check"
							size={50}
							color="#fff"
						/>
					</View>
				</View>

				<Text style={styles.title}>Transaksi Berhasil!</Text>
				<Text style={styles.subtitle}>Terima kasih atas pembelian Anda</Text>

				<View style={styles.card}>
					<Text style={styles.cardTitle}>Detail Transaksi</Text>
					<View style={styles.cardContent}>
						<View style={styles.row}>
							<Text style={styles.label}>Waktu</Text>
							<Text style={styles.value}>{createdAt}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.label}>Metode Pembayaran</Text>
							<Text style={styles.value}>{typePayment?.toUpperCase()}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.label}>Catatan</Text>
							<Text style={styles.value}>
								{note == 'Unknown' ? 'Tidak ada' : note}
							</Text>
						</View>
					</View>
				</View>

				{/* Products List */}
				<View style={styles.card}>
					<Text style={styles.cardTitle}>Detail Produk</Text>
					{products?.map((product, index) => (
						<View
							key={index}
							style={styles.productItem}>
							<View style={styles.productInfo}>
								<Text style={styles.productName}>{product.name}</Text>
								<Text style={styles.productQuantity}>{product.quantity}x</Text>
							</View>
							<Text style={styles.productPrice}>
								Rp {(product.price * product.quantity).toLocaleString('id-ID')}
							</Text>
						</View>
					))}
					<View style={styles.totalContainer}>
						<Text style={styles.totalLabel}>Total</Text>
						<Text style={styles.totalAmount}>
							Rp {totalAmount?.toLocaleString('id-ID')}
						</Text>
					</View>
				</View>

				{/* Back to Home Button */}
				<TouchableOpacity
					style={styles.button}
					onPress={handleBackToHome}>
					<Text style={styles.buttonText}>Kembali ke Beranda</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	scrollContent: {
		padding: 20,
	},
	iconContainer: {
		alignItems: 'center',
		marginVertical: 20,
	},
	iconCircle: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: '#A7D477',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#333',
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
		textAlign: 'center',
		marginBottom: 24,
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 15,
		padding: 16,
		marginBottom: 16,
		elevation: 2,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 12,
	},
	cardContent: {
		gap: 8,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 4,
	},
	label: {
		fontSize: 14,
		color: '#666',
	},
	value: {
		fontSize: 14,
		fontWeight: '500',
		color: '#333',
	},
	productItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	productInfo: {
		flex: 1,
	},
	productName: {
		fontSize: 16,
		color: '#333',
		marginBottom: 4,
	},
	productQuantity: {
		fontSize: 14,
		color: '#666',
	},
	productPrice: {
		fontSize: 16,
		fontWeight: '500',
		color: '#333',
	},
	totalContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 12,
		paddingTop: 12,
		borderTopColor: '#f0f0f0',
	},
	totalLabel: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333',
	},
	totalAmount: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#A7D477',
	},
	button: {
		backgroundColor: '#A7D477',
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: 'center',
		marginTop: 8,
		elevation: 2,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default SuccessScreen;
