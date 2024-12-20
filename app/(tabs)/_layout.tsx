import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import BlurTabBarBackground from '@/components/ui/TabBarBackground.ios';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: BlurTabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          android: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'home',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name='house.fill'
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='transaction'
        options={{
          title: 'Transaction',
          tabBarIcon: ({ color }) => (
            <Entypo
              name='shop'
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='history'
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name='receipt'
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Akun',
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name='person'
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
