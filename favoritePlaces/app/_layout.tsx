import { router, Stack } from "expo-router";
import { StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { init } from "@/utility/database";
import AppLoading from "@/Components/AppLoading";

export default function RootLayout() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <StatusBar backgroundColor="#000" />
      <Stack.Screen
        name="index"
      />
      <Stack.Screen name="Map" />
    </Stack>
  );
}
