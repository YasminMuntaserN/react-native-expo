import * as LocationLib from 'expo-location';

export const getAddressFromCoords = async (lat: number, lng: number): Promise<string> => {
  try {
    const addresses = await LocationLib.reverseGeocodeAsync({ latitude: lat, longitude: lng });
    const place = addresses[0];
    if (!place) return 'Unknown location';

    return `${place.name || ''} ${place.street || ''}, ${place.city || ''}, ${place.region || ''}, ${place.country || ''}`.trim();
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    return 'Unknown address';
  }
};
