import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Pressable,
} from 'react-native';
import { Meal } from '@/data/meal';

type Props = {
  meal: Meal;
  onPress?: () => void;
};

export default function MealCard({ meal, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      style={({ pressed }) => [styles.card, pressed && Platform.OS === 'ios' && { opacity: 0.9 }]}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        <View style={styles.titleOverlay}>
          <Text numberOfLines={2} style={styles.title}>
            {meal.title}
          </Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Pill>{meal.duration}m</Pill>
        <Pill>{meal.complexity.toUpperCase()}</Pill>
        <Pill>{meal.affordability.toUpperCase()}</Pill>
      </View>
    </Pressable>
  );
}

const Pill = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.pill}>
    <Text style={styles.pillText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 14,
    backgroundColor: '#fff',
    overflow: Platform.select({ android: 'hidden', ios: 'visible' }),
    // Shadows
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 4,
      },
    }),
  },

  imageWrapper: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#f0f0f0',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: '#333',
  },
});
