import { Colors } from '@/constants/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, Touchable, TouchableOpacity, View } from 'react-native'
import { signOut } from "firebase/auth";
import { auth } from '@/constants/Config';
import { router } from 'expo-router';
function ProfileScreen() {

  const handlerSignout = () => {
    signOut(auth);
    router.replace('/');
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.primary.textPrimary,
      // justifyContent: "center",
      // alignItems: "center",
    }}>
      <View style={{
        marginTop: 90,
        backgroundColor: Colors.primary.base,
        marginHorizontal: 30,
        padding: 30,
        borderRadius: 10,
        shadowColor: Colors.dark.background,
        marginBottom: 30,
        flexDirection: "row",
        gap: 10,
      }}>
        <View style={{
          width: 60,
          height: 60,
          backgroundColor: Colors.primary.textPrimary,
          borderRadius: "100%"
        }}>

        </View>
        <View>
          <Text style={{
            color: Colors.primary.textPrimary,
            fontSize: 24,
            fontWeight: "700",
          }}>Hengki Kurniawan</Text>
          <Text style={{
            color: Colors.primary.textPrimary,
          }}>Barista Kosong</Text>
        </View>
      </View>
      <View style={{
        marginHorizontal: 30,
        gap: 50,
      }}>
        <View style={{
          // padding: 20,
          borderStyle: "solid",
          // borderWidth: 0.5,
          // borderRadius: 10,
          flexDirection: "row",
          gap: 20,
          alignItems: "center"
        }}>
          <MaterialIcons name='person-outline' size={30} />
          <View>
            <Text style={{
              fontWeight: 900,
              fontSize: 20,
            }}>Profile</Text>
            <Text>View Your KYC Information</Text>
          </View>
        </View>

        <View style={{
          // padding: 20,
          borderStyle: "solid",
          // borderWidth: 0.5,
          // borderRadius: 10,
          flexDirection: "row",
          gap: 20,
          alignItems: "center"
        }}>
          <MaterialIcons name='person-add-alt' size={30} />
          <View>
            <Text style={{
              fontWeight: 900,
              fontSize: 20,
            }}>Tambah Nomor</Text>
            <Text>View Your KYC Information</Text>
          </View>
        </View>

        <TouchableOpacity style={{
          backgroundColor: "red",
          paddingHorizontal: 30,
          paddingVertical: 20,
          borderRadius: 10,
        }} onPress={handlerSignout}>
          <Text style={{
            color: Colors.primary.textPrimary,
            fontSize: 18,
            fontWeight: 700,
            textAlign: "center"
          }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileScreen