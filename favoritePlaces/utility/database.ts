import { Place } from '@/types/place';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('places.db');

export async function init() {
  // await db.execAsync(`DROP TABLE IF EXISTS places;`);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      description TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    );
  `);
}

export async function insertPlace(place: Place) {
  if (!place.lat === undefined || place.lng === undefined) {
    throw new Error("Location (lat/lng) must be provided.");
  }
  const result = await db.runAsync(
    `INSERT INTO places (title, imageUri, address,description, lat, lng) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      place.title ?? '',
      place.imageUri ?? '',
      place.address ?? '',
      place.description ?? '',
      place.lat ?? 0,
      place.lng ?? 0
    ]
  );
  return result;
}


export async function fetchPlaces(): Promise<Place[]> {
  const results = await db.getAllAsync<Place>(`SELECT * FROM places`);
  return results;
}


export async function fetchPlace(id: number): Promise<Place> {
  const result = await db.getFirstAsync<Place>(
    `SELECT * FROM places WHERE id = ?`,
    [id]
  );
  return result;
}