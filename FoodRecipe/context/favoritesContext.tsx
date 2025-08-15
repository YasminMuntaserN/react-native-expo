import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  PropsWithChildren,
} from 'react';
import type { Meal } from '@/data/meal';

type FavoritesContextValue = {
  favoriteMeals: Meal[];
  addFavorite: (meal: Meal) => void;
  removeFavorite: (mealId: string) => void;
  isFavorite: (mealId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export function FavoritesContextProvider({ children }: PropsWithChildren) {
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);

  function addFavorite(meal: Meal) {
    setFavoriteMeals((current) => {
      if (current.some((m) => m.id === meal.id)) return current;
      return [...current, meal];
    });
  }

  function removeFavorite(mealId: string) {
    setFavoriteMeals((current) => current.filter((m) => m.id !== mealId));
  }

  function isFavorite(mealId: string) {
    return favoriteMeals.some((m) => m.id === mealId);
  }

  const value = useMemo(
    () => ({ favoriteMeals, addFavorite, removeFavorite, isFavorite }),
    [favoriteMeals]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used within a FavoritesContextProvider');
  }
  return ctx;
}
