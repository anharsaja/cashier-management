import { Colors } from '@/constants/Colors';
import useLogin from '@/hooks/useLogin';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function LoadingScreen() {
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
        Memeriksa status login...
      </Text>
    </View>
  );
}

function Login() {
  const { setFormLogin, status, error, onLogin } = useLogin();

  if (status == 'loading' || status == 'authenticate') {
    return <LoadingScreen />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('@/assets/images/logo.png')}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text
        style={{
          color: Colors.primary.base,
          fontWeight: 'bold',
          fontSize: 32,
        }}
      >
        Sign In
      </Text>


      <Text
        style={{
          textAlign: 'center',
          color: '#61677D',
          marginTop: 20,
        }}
      >
        Pernah ga ready ?
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: '#61677D',
        }}
      >
        Tak delok delok kok awakmu ga ndelok aku ?.
      </Text>

      {
        error != "" ? (
          <Text style={{
            color: "red",
            marginTop: 10,
          }}>{error}</Text>
        ) : null
      }

      <View
        style={{
          padding: 10,
          // backgroundColor: Colors.primary.base,
          width: '100%',
          paddingHorizontal: 24,
          marginTop: 20,
        }}
      >
        <TextInput
          placeholder='Email'
          onChangeText={(text) => setFormLogin('email', text)}
          style={{
            paddingVertical: 18,
            paddingHorizontal: 24,
            borderRadius: 10,
            fontSize: 18,
            backgroundColor: '#F5F9FE',
            color: '#7C8BA0',
          }}
        />
        <TextInput
          placeholder='Password'
          onChangeText={(text) => setFormLogin('password', text)}
          secureTextEntry={true}
          style={{
            marginTop: 20,
            paddingVertical: 18,
            paddingHorizontal: 24,
            borderRadius: 10,
            fontSize: 18,
            backgroundColor: '#F5F9FE',
            color: '#7C8BA0',
          }}
        />

        <Text
          style={{
            fontSize: 10,
            color: '#7C8BA0',
            textAlign: 'right',
            marginTop: 10,
          }}
        >
          Forgot Password?
        </Text>

        <TouchableOpacity
          onPress={onLogin}
          style={{
            marginTop: 30,
            borderRadius: 10,
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 50,
            paddingRight: 50,
            backgroundColor: Colors.primary.base,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 1, height: 13 },
          }}
        >
          {status == 'loading' ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '700',
                textAlign: 'center',
              }}
            >
              Log in
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
