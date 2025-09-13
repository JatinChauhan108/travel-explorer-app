import { createSlice } from "@reduxjs/toolkit";

// Helper functions for Local Storage
const loadFavorites = () => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading favorites from localStorage", error);
    return [];
  }
};

const saveFavorites = (favorites) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites to localStorage", error);
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadFavorites(),
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.find((fav) => fav.url === action.payload.url);
      if (!exists) {
        state.push(action.payload);
        saveFavorites(state);
      }
    },
    removeFavorite: (state, action) => {
      const updated = state.filter((fav) => fav.url !== action.payload.url);
      saveFavorites(updated);
      return updated;
    },
    clearFavorites: () => {
      saveFavorites([]);
      return [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

