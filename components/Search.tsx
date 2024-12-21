import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

export default function Search() {
  return (
    <View
      style={{
        marginTop: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
      }}
    >
      <TextInput
        placeholder='Search'
        placeholderTextColor={Colors.primary.textPrimary}
        onChangeText={(text) => {}}
        style={{
          width: '75%',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 15,
          fontSize: 18,
          backgroundColor: 'rgba(126, 126, 126, 0.5)',
          // opacity: 0.2,
          color: '#fff',
        }}
      />
      <TouchableOpacity
        style={{
          width: '20%',
          padding: 20,
          backgroundColor: Colors.primary.base,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          borderRadius: 15,
        }}
      >
        <MaterialIcons
          name='search'
          size={24}
          color={Colors.primary.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}
