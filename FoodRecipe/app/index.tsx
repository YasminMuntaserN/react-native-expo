import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { CATEGORIES } from "@/data/category";
import { router, useNavigation } from "expo-router";

export default function Index() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "All Categories",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.categoryBox, { backgroundColor: item.color }]}
            onPress={() => router.push({
              pathname: '/category/[id]',
              params: { id: String(item.id) },
            })
            }
          >
            <View style={styles.overlay}>
              <Text style={styles.categoryTitle}>{item.title}</Text>
            </View>
          </Pressable>
        )
        }
        keyExtractor={(item) => item.id}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  listContainer: {
    paddingBottom: 20,
  },
  categoryBox: {
    flex: 1,
    margin: 10,
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "flex-end",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 12,
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
