import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function LoadingScreen({ message }: { message: string }) {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <ActivityIndicator
        size='small'
        color={Colors.primary.base}
      />
      <Text style={{ marginTop: 20, fontSize: 16, color: 'black' }}>
        {message}
      </Text>
    </View>
  );
}

export default LoadingScreen;
