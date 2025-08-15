import { Text, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Location } from '@/types/place'
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

export default function CustomMapView({ location, title, selectLocationHandler }: { location?: Location | null, title: string, selectLocationHandler?: (event: MapPressEvent) => void }) {

  const region = {
    latitude: location?.lat ?? 29.4,
    longitude: location?.lng ?? 31.35,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };



  return (
    <MapView
      onPress={selectLocationHandler}
      style={{ flex: 1 }}
      region={region}
    >
      <Marker
        coordinate={{
          latitude: location?.lat ?? 29.4,
          longitude: location?.lng ?? 31.35,
        }}
        title={title}
      />
    </MapView>
  )
}

const styles = StyleSheet.create({})