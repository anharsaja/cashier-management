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
import Search from '../Search';

function HeaderComponent() {
  const getGreetingMessage = () => {
    const currentHour = new Date().getHours(); // Mendapatkan jam saat ini (0-23)
    if (currentHour >= 5 && currentHour <= 10) {
      return 'Sugeng Enjang';
    } else if (currentHour >= 10 && currentHour < 12) {
      return 'Sugeng Siang'; // Siang (6:00 AM - 11:59 AM)
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Sugeng Sonten'; // Sore (12:00 PM - 5:59 PM)
    } else {
      return 'Sugeng Ndalu'; // Malam (6:00 PM - 5:59 AM)
    }
  };

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
        {getGreetingMessage()}
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
      <Search />

      <View
        style={{
          boxShadow: 'rgba(17, 12, 46, 0.15) 0 48 100 0',
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
