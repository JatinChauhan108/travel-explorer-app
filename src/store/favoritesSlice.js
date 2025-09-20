import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc
} from "firebase/firestore";

// 🔹 Fetch favorites of a specific user
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId) => {
    if (!userId) return [];
    const snapshot = await getDocs(collection(db, "favorites", userId, "items"));
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id, // Firestore auto ID
      ...docSnap.data(),
    }));
  }
);

// 🔹 Add favorite
export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (item, { getState }) => {
    const state = getState();
    const userId = state.auth.user?.uid;
    if (!userId) throw new Error("User not logged in");

    // Create a new doc with auto ID
    const favRef = doc(collection(db, "favorites", userId, "items"));
    await setDoc(favRef, item);

    return { ...item, id: favRef.id };
  }
);

// 🔹 Remove favorite
export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async (id, { getState }) => {
    const state = getState();
    const userId = state.auth.user?.uid;
    if (!userId) throw new Error("User not logged in");

    const favRef = doc(db, "favorites", userId, "items", id);
    await deleteDoc(favRef);

    return id;
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearFavorites: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        console.log("Fetch favorites fulfilled")
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("Fetch Favorites rejected")
      })

      // 🔹 Add favorite
      .addCase(addFavorite.pending, (state) => {
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const exists = state.items.find((fav) => fav.url === action.payload.url);
        if (!exists) {
          state.items.push(action.payload);
        }
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // 🔹 Remove favorite
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter((fav) => fav.id !== action.payload);
        console.log("Remove Favorite fulfilled")
      })
      .addCase(removeFavorite.pending, (state, action) =>{
        console.log("Remove Favorite Pending")
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

