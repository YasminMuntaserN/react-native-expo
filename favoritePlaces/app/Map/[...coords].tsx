import CustomMapView from "@/Components/CustomMapView";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Map() {
  const { coords } = useLocalSearchParams<{ coords: string[] }>();
  const [initialLat, initialLng, address] = coords || [];

  console.log("Map params:", initialLat, initialLng, address);
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[
          "#667eea",
          "#764ba2",
          "#f093fb",
          "#f5576c",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerContainer}
      >
        <View style={styles.subCointainer}>
          <Ionicons name="arrow-back-circle-outline" onPress={() => router.back()} style={styles.icon} size={32} />
          <Text style={styles.headerTitle}>
            📍 {address}
          </Text>
        </View>

      </LinearGradient>
      <View style={{ flex: 1 }}>
        <CustomMapView
          location={{ lat: +initialLat, lng: +initialLng }}
          title="place"
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  headerTitle: {
    marginTop: 10,
    fontSize: 21,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  icon: {
    borderRadius: 25,
    padding: 8,
    alignSelf: 'flex-start',
    color: '#fff'
  },
  subCointainer: {
    padding: 10,
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'

  }
});
