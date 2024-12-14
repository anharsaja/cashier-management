import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';

import useLogin from '@/hooks/useLogin';
import HeaderComponent from '@/components/home/HeaderComponent';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SFSymbol } from 'expo-symbols';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

const features = [
  {
    id: '1',
    name: 'Cashier',
    icon: 'transaction',
    onPress: () => router.push('/(tabs)/transaction'),
  },
  {
    id: '2',
    name: 'Product',
    icon: 'transaction',
    onPress: () => router.push('/product'),
  },
  {
    id: '3',
    name: 'Transaksi Hari Ini',
    icon: 'transaction',
    onPress: () => router.push('/transactions'),
  },
  {
    id: '4',
    name: 'Laporan Sisa',
    icon: 'transaction',
    onPress: () => alert(` clicked!`),
  },
  {
    id: '5',
    name: 'Laporan Hari Ini',
    icon: 'transaction',
    onPress: () => alert(` clicked!`),
  },
  {
    id: '6',
    name: 'Laporan Mingguan',
    icon: 'transaction',
    onPress: () => alert(` clicked!`),
  },
];

const FeatureButton = ({
  name,
  icon,
  onPress,
}: {
  name: string;
  icon: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <MaterialIcons
        name={'production-quantity-limits'}
        size={30}
        color={Colors.primary.base}
      />
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const { logOut } = useLogin();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
      contentContainerStyle={{ flexGrow: 1, }}
    >
      <HeaderComponent />

      <View
        style={{
          marginHorizontal: 30,
          marginTop: 100,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.primary.bgDark,
          }}
        >
          All Features
        </Text>
      </View>
      <FlatList
        style={{
          marginTop: 10,
        }}
        data={features}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <FeatureButton
            name={item.name}
            icon={item.icon}
            onPress={item.onPress}
          />
        )}
        contentContainerStyle={styles.grid}
        scrollEnabled={false}
      />
    </ScrollView>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0 7 29 0;',
    elevation: 3,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
