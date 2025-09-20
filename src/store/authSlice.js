import { createSlice } from "@reduxjs/toolkit";
import { fetchFavorites } from "./favoritesSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,     // will hold email, uid, displayName, photoURL
    loading: true,  // while checking Firebase session
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      fetchFavorites(state.user.uid);
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
