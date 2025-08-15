import React, { useLayoutEffect, useState } from 'react';
import { Image, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Meal, MEALS } from '@/data/meal';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '@/context/favoritesContext';

function MealScreen() {
  const { mealId } = useLocalSearchParams();
  const navigation = useNavigation();
  const meal: Meal | undefined = MEALS.find(c => c.id === mealId);
  const [isSaved, setIsSaved] = useState(false);
  const { addFavorite, removeFavorite } = useFavorites();
  const toggleSaved = () => {
    if (meal) {
      if (isSaved) {
        removeFavorite(meal?.id ?? '');
      } else {
        addFavorite(meal);
      }
    }
    setIsSaved(pre => !pre);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: meal?.title,
      headerRight: () => <TouchableOpacity style={styles.saveButton} onPress={toggleSaved}>
        <Ionicons
          name='heart'
          size={24}
          color={isSaved ? "#ff4444" : "#876d4c"}
          fill={isSaved ? "#ff4444" : "transparent"}
        />
      </TouchableOpacity>,
    });
  }, [navigation, , meal?.title, isSaved]);


  if (!meal) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Meal not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: meal.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>{meal.title}</Text>

      <View style={styles.metaRow}>
        <Pill icon="time-outline" label={`${meal.duration}m`} />
        <Pill icon="cash-outline" label={capitalize(meal.affordability)} />
        <Pill icon="barbell-outline" label={capitalize(meal.complexity)} />
      </View>

      <View style={styles.flagsRow}>
        <Flag label="Gluten Free" active={meal.isGlutenFree} />
        <Flag label="Vegan" active={meal.isVegan} />
        <Flag label="Vegetarian" active={meal.isVegetarian} />
        <Flag label="Lactose Free" active={meal.isLactoseFree} />
      </View>

      <SectionTitle>Ingredients</SectionTitle>
      <View style={styles.list}>
        {meal.ingredients.map((ingredient) => (
          <ListItem key={ingredient} text={ingredient} />
        ))}
      </View>

      <SectionTitle>Steps</SectionTitle>
      <View style={styles.list}>
        {meal.steps.map((step, idx) => (
          <StepItem key={step} index={idx + 1} text={step} />
        ))}
      </View>
    </ScrollView>
  );
}


const Pill = ({ icon, label }) => (
  <View style={styles.pill}>
    {icon ? <Ionicons name={icon} size={14} color="#444" style={{ marginRight: 4 }} /> : null}
    <Text style={styles.pillText}>{label}</Text>
  </View>
);

const SectionTitle = ({ children }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

const ListItem = ({ text }) => (
  <View style={styles.listItem}>
    <Ionicons name="chevron-forward" size={16} color="#6b7280" style={{ marginRight: 6 }} />
    <Text style={styles.listItemText}>{text}</Text>
  </View>
);

const StepItem = ({ index, text }) => (
  <View style={styles.stepItem}>
    <View style={styles.stepBadge}>
      <Text style={styles.stepBadgeText}>{index}</Text>
    </View>
    <Text style={styles.stepText}>{text}</Text>
  </View>
);

const Flag = ({ label, active }) => (
  <View style={[styles.flag, active ? styles.flagOn : styles.flagOff]}>
    <Ionicons
      name={active ? 'checkmark-circle' : 'close-circle'}
      size={14}
      color={active ? '#065f46' : '#991b1b'}
      style={{ marginRight: 4 }}
    />
    <Text style={[styles.flagText, active ? styles.flagTextOn : styles.flagTextOff]}>
      {label}
    </Text>
  </View>
);


function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 260,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 16,
    color: '#111827',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 8,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  pillText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
  },
  flagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 12,
    gap: 6,
  },
  flag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  flagOn: {
    backgroundColor: '#ecfdf5',
    borderColor: '#6ee7b7',
  },
  flagOff: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  flagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  flagTextOn: {
    color: '#065f46',
  },
  flagTextOff: {
    color: '#991b1b',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
    color: '#111827',
  },
  list: {
    marginHorizontal: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 6,
  },
  listItemText: {
    fontSize: 15,
    color: '#374151',
    flex: 1,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    gap: 8,
  },
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    color: '#374151',
    fontSize: 15,
    lineHeight: 22,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#b91c1c',
  },
  saveButton: {
    width: 38,
    height: 38,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default MealScreen;
