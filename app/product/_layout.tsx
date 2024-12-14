import { Stack } from 'expo-router';

export default function TransactionsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // Menampilkan header
        title: 'Transactions', // Kustomisasi judul default
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Products', // Judul untuk layar index
        }}
      />
    </Stack>
  );
}