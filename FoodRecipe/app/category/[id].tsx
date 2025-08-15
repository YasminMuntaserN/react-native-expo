import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Meal, MEALS } from "@/data/meal";
import { CATEGORIES } from "@/data/category";
import { router, useNavigation } from "expo-router";
import MealCard from "@/components/MealCard";

export default function CategoryScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [list, setList] = useState<Meal[]>([]);
  console.log("Category ID:", id);
  useEffect(() => {
    const categoriesMealsList = MEALS.filter((meal) =>
      meal.categoryIds.includes(id as string)
    );
    setList(categoriesMealsList);
  }, [id]);

  const category = CATEGORIES.find((c) => c.id === id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category ? `Dishes in ${category.title}` : "Dishes",
    });
  }, [navigation, category]);

  return (
    <View>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() =>
              router.push({
                pathname: `/meal/[mealId]`,
                params: { mealId: String(item.id) },
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
