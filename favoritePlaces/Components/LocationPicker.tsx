import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import { Location, Place } from '@/types/place';
import CustomMapView from './CustomMapView';
import { MapPressEvent } from 'react-native-maps';
import { getAddressFromCoords } from '@/utility/helper';

const LocationPicker = ({
  addLocation,
}: {
  addLocation: React.Dispatch<React.SetStateAction<Place | null>>;
}) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const [pickonMap, setPickOnMap] = useState(false);

  const verifyPermissions = async () => {
    console.log(locationPermissionInformation?.status)
    if (locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  const handleUserLocation = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const result = await getCurrentPositionAsync();
    setLocation({
      lat: result.coords.latitude,
      lng: result.coords.longitude
    })
    console.log(location);
  }

  const selectLocationHandler = async (event: MapPressEvent) => {
    if (!pickonMap) return;

    const { latitude, longitude } = event.nativeEvent.coordinate;

    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    console.log(`${latitude}  ${longitude}`);
    setLocation({ lat: latitude, lng: longitude });
    setPickOnMap(false);
  };

  useEffect(() => {
    if (location) {
      getAddressFromCoords(location.lat, location.lng).then((address) => {
        addLocation((prev) => ({
          ...prev,
          lat: location.lat,
          lng: location.lng,
          address: address,
        }));
      });
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {location || pickonMap ? (
          <CustomMapView location={location} title="position" selectLocationHandler={selectLocationHandler} />
        ) : (
          <Text style={styles.placeholder}>No location chosen yet.</Text>
        )}
      </View>
      <View style={styles.buttonsCointainer}>
        <Pressable style={styles.button} onPress={() => handleUserLocation()}>
          <Ionicons name="location" size={24} color="#fff" />
          <Text style={styles.buttonText}>Use Current Location</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => setPickOnMap(true)}>
          <Ionicons name="map" size={24} color="#fff" />
          <Text style={styles.buttonText}>Pick on Map</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  preview: {
    height: 200,
    backgroundColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  placeholder: {
    color: '#999',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#17a2b8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
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
