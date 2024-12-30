import { Stack } from 'expo-router';

export default function TransactionsLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: true, // Menampilkan header
				title: 'Transactions', // Kustomisasi judul default
			}}>
			<Stack.Screen
				name="index"
				options={{
					title: 'All Transactions', // Judul untuk layar index
				}}
			/>
			<Stack.Screen
				name="products-day"
				options={{
					title: 'Products Terjual', // Judul untuk layar index
				}}
			/>
		</Stack>
	);
}
