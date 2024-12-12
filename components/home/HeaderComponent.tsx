import React from 'react';
import {
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

function HeaderComponent() {
  return (
    <View
      style={{
        position: 'relative',
        backgroundColor: Colors.primary.bgDark,

        display: 'flex',
        flexDirection: 'column',
        paddingTop: 60,
        paddingBottom: 100,
        // justifyContent: 'center',
        paddingHorizontal: 30,
      }}
    >
      <Text
        style={{
          color: Colors.primary.textSecond,
          fontSize: 16,
          fontWeight: '300',
        }}
      >
        Selamat Datang
      </Text>
      <Text
        style={{
          color: Colors.primary.textPrimary,
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Barista Kosong
      </Text>
      <View
        style={{
          marginTop: 25,
          display: 'flex',
          flexDirection: 'row',
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
            backgroundColor: 'rgba(162,162,162, 0.5)',
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

      <View
        style={{
          position: 'absolute',
          left: 30,
          bottom: -80,
          padding: 20,
          width: '100%',
          height: 150,
          borderRadius: 10,
          backgroundColor: Colors.primary.bgBanner,
        }}
      >
        <Text
          style={{
            alignItems: 'center',
            backgroundColor: Colors.primary.base,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            color: Colors.primary.textPrimary,
            textAlign: 'center',
          }}
        >
          Tempat Banner Promo
        </Text>
      </View>
    </View>
  );
}

export default HeaderComponent;
