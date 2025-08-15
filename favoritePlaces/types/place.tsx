export interface Place {
  title?: string;
  imageUri?: string;
  address?: string;
  lat?: number;
  lng?: number;
  id?: number;
  description?: string;
}

export interface Location {
  lat: number;
  lng: number;
}