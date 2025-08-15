import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useFavorites } from '@/context/favoritesContext';

export default function Favorites() {
  const { favoriteMeals } = useFavorites();

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={favoriteMeals}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={[
          styles.listContent,
          favoriteMeals.length === 0 && styles.emptyListPadding,
        ]}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <View style={styles.emptyWrapper}>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart icon on a meal to save it.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.mealCard}
            onPress={() => {
              /* navigate to details if you want */
            }}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
            // accessibilityLabel could be used instead of alt (RN doesn't support `alt`)
            // accessibilityLabel={item.title}
            />
            <View style={styles.content}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>

              <View style={styles.metaRow}>
                <Text style={styles.meta}>{item.duration} min</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.meta}>{item.affordability}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.meta}>{item.complexity}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const PADDING_H = 16;
const GAP = 12;
const CARD_RADIUS = 12;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - PADDING_H * 2 - GAP) / 2;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F5F2',
  },

  listContent: {
    paddingHorizontal: PADDING_H,
    paddingTop: 16,
    paddingBottom: 32,
  },

  emptyListPadding: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: GAP,
  },

  mealCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },

    // Android shadow
    elevation: 3,
  },

  image: {
    width: '100%',
    aspectRatio: 1, // keep it square (RN Image requires explicit size). :contentReference[oaicite:2]{index=2}
  },

  content: {
    padding: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c2c2c',
    marginBottom: 6,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  meta: {
    fontSize: 12,
    color: '#807a72',
    textTransform: 'capitalize',
  },

  dot: {
    marginHorizontal: 6,
    color: '#c4bdb4',
  },

  emptyWrapper: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3b3b3b',
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: '#8a8278',
    textAlign: 'center',
  },
});
