import { FavoritesContextProvider } from "@/context/favoritesContext";
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "react-native";


export default function RootLayout() {
  return (
    <FavoritesContextProvider>
      <StatusBar backgroundColor="#000" />
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            title: 'All Categories',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="star" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="category/[id]"
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="meal/[mealId]"
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer>
    </FavoritesContextProvider >
  );
}
