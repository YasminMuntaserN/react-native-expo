import AppLoading from "@/Components/AppLoading";
import { Place } from "@/types/place";
import { fetchPlaces } from "@/utility/database";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";


export default function Index() {
  const [places, setPlaces] = useState<Place[] | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetchPlaces();
        setPlaces(res as Place[]);
      } catch (error) {
        console.error("Failed to fetch places", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  const handle = (item: Place) => {
    console.log(item);
    console.log(`${item?.lat}/${item?.lng}`)
    router.push(`/Map/${item?.lat}/${item?.lng}/${item.address}` as any)
  }

  return (
    <View style={styles.container}>
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
        <View style={[styles.floatingElement, styles.element1]} />
        <View style={[styles.floatingElement, styles.element2]} />
        <View style={[styles.floatingElement, styles.element3]} />

        <View style={styles.headerIconContainer}>
          <LinearGradient
            colors={['#ff9a9e', '#fecfef', '#fecfef']}
            style={styles.iconGradient}
          >
            <Ionicons name="location" size={32} color="#fff" />
          </LinearGradient>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.headerSubtitle}>Discover</Text>
          <Text style={styles.headerTitle}>Your Favorite</Text>
          <Text style={styles.headerHighlight}>Places</Text>
          <View style={styles.titleUnderline} />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{places?.length || 0}</Text>
            <Text style={styles.statLabel}>Places</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <TouchableOpacity onPress={() => router.navigate("/AddNewPlace")}>
              <Ionicons
                name="add"
                size={36}
                color="#fff"
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
            <Text style={styles.statLabel}>Add New Place</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.listWrapper}>
        <FlatList
          data={places}
          keyExtractor={(item) => (item?.id ? item?.id.toString() : "")}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.navigate(`/Place/${item.id}`)}
            >
              <View style={styles.cardImageContainer}>
                <Image source={{ uri: item.imageUri }} style={styles.image} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.imageOverlay}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.addressContainer}>
                  <Ionicons name="location-outline" size={14} color="#888" />
                  <Text style={styles.address}>{item.address}</Text>
                </View>
              </View>
              <Pressable style={styles.mapButton} onPress={() => handle(item)
              }>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.mapButtonGradient}
                >
                  <Ionicons name="map" size={20} color="#fff" />
                </LinearGradient>
              </Pressable>
            </Pressable>
          )}
        />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },

  // Floating decorative elements
  floatingElement: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
  },
  element1: {
    width: 80,
    height: 80,
    top: 30,
    right: -20,
  },
  element2: {
    width: 60,
    height: 60,
    top: 120,
    left: -15,
  },
  element3: {
    width: 40,
    height: 40,
    bottom: 20,
    right: 30,
  },

  // Header icon
  headerIconContainer: {
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 30
  },
  iconGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  // Title styling
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    fontWeight: '300',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerHighlight: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  titleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 2,
  },

  // Stats section
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backdropFilter: 'blur(10px)',
  },
  statItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginRight: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginLeft: 4,
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 15,
  },

  // List styling
  listWrapper: {
    flex: 1,
    marginTop: -15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#f8fafc',
  },
  listContainer: {
    padding: 20,
    paddingTop: 25,
  },

  // Enhanced card styling
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  cardImageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  mapButton: {
    overflow: 'hidden',
  },
  mapButtonGradient: {
    padding: 14,
    alignItems: 'center',
  },
});