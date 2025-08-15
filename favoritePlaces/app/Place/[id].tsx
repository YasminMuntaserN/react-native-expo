import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Place } from "@/types/place";
import { fetchPlace } from "@/utility/database";
import AppLoading from "@/Components/AppLoading";

const { width, height } = Dimensions.get("window");

const PlaceDetails = () => {
  const { id } = useLocalSearchParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetchPlace(+id);
        setPlace(res as Place);
      } catch (error) {
        console.error("Failed to fetch places", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function showOnMapHandler() {
    router.push(`/Map/${place?.lat}/${place?.lng}/${place?.address}` as any);
  }

  if (loading) {
    return <AppLoading />;
  }

  if (!place) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          style={styles.errorGradient}
        >
          <View style={styles.errorContent}>
            <Ionicons name="sad-outline" size={80} color="#fff" />
            <Text style={styles.errorTitle}>Oops!</Text>
            <Text style={styles.errorMessage}>
              This place seems to have wandered off...
            </Text>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.heroContainer}>
        <Image
          source={{ uri: place.imageUri }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "transparent", "rgba(0,0,0,0.7)"]}
          style={styles.imageOverlay}
        />

        <View style={styles.headerControls}>
          <Pressable style={styles.controlButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.floatingTitleCard}>
          <LinearGradient
            colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.9)"]}
            style={styles.titleCardGradient}
          >
            <Text style={styles.heroTitle}>{place.title}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={16} color="#667eea" />
              <Text style={styles.heroAddress}>{place.address}</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.descriptionCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="book" size={24} color="#667eea" />
            <Text style={styles.cardTitle}>About This Place</Text>
          </View>
          <Text style={styles.description}>{place.description}</Text>
        </View>

        <View style={styles.actionCards}>
          <Pressable style={styles.actionCard} onPress={showOnMapHandler}>
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              style={styles.actionCardGradient}
            >
              <View style={styles.actionCardContent}>
                <Ionicons name="map" size={32} color="#fff" />
                <Text style={styles.actionCardTitle}>View on Map</Text>
                <Text style={styles.actionCardSubtitle}>
                  Navigate & explore
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  heroContainer: {
    height: height * 0.55,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  headerControls: {
    position: "absolute",
    top: StatusBar.currentHeight || 44,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(10px)",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },

  // Floating Title Card
  floatingTitleCard: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  titleCardGradient: {
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a202c",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  heroAddress: {
    fontSize: 16,
    color: "#4a5568",
    marginLeft: 6,
    fontWeight: "500",
  },

  // Content Section
  contentContainer: {
    flex: 1,
    marginTop: -15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#8495a7",
  },
  scrollContent: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Description Card
  descriptionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a202c",
    marginLeft: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#4a5568",
    fontWeight: "400",
  },

  // Action Cards
  actionCards: {
    marginBottom: 24,
    gap: 16,
  },
  actionCard: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  actionCardGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  actionCardContent: {
    flex: 1,
  },
  actionCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginTop: 8,
    marginBottom: 4,
  },
  actionCardSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },

  // Error States
  errorContainer: {
    flex: 1,
  },
  errorGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorContent: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    marginTop: 20,
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
    textAlign: "center",
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
