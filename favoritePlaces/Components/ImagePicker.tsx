import { View, Text, Pressable, StyleSheet, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
} from 'expo-image-picker';
import { Place } from '@/types/place';

export default function ImagePicker({
  addImage,
}: {
  addImage: React.Dispatch<React.SetStateAction<Place | null>>;
}) {

  const [image, setImage] = useState('');
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      console.log('no permissions peovided');
      return;
    }

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }

  }

  const pickImageFromLibrary = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      console.log('no permissions peovided');
      return;
    }

    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  }

  useEffect(() => {
    if (image) {
      addImage((prev) => ({
        ...prev,
        imageUri: image,
      }));
    }
  }, [image]);


  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>No image selected yet.</Text>
        )}
      </View>
      <View style={styles.buttonsCointainer}>
        <Pressable style={styles.button} onPress={() => takeImageHandler()}>
          <Ionicons name="camera" size={24} color="#fff" />
          <Text style={styles.buttonText}>Take Image</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => pickImageFromLibrary()}>
          <Ionicons name="camera" size={24} color="#fff" />
          <Text style={styles.buttonText}>Pick Image</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  preview: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: '#999',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1e90ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonsCointainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  }
});
