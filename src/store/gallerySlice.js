import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config/config"

export const fetchMedia = createAsyncThunk(
  "gallery/fetchMedia",
  async ({ country, page = 1 }, { getState, rejectWithValue }) => {
    try {
      // Step 1: Fetch country info
      const res1 = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      const json1 = await res1.json();

      if (!json1 || json1.status === 404) {
        return rejectWithValue("Country not found");
      }

      const countryData = {
        name: json1[0].name.common,
        flag: json1[0].flags?.svg || json1[0].flags?.png,
      };

      // Step 2: Fetch images from Unsplash
      const res2 = await fetch(
        `https://api.unsplash.com/search/photos?query=${countryData.name}&page=${page}&client_id=${config.unsplashId}`
      );
      const json2 = await res2.json();

      return { 
        country: countryData, 
        media: json2.results.map(img => ({
          url: img.urls.regular,
          location: img.location?.name || img.alt_description,
        })), 
        page 
      };
    } catch (err) {
      return rejectWithValue("Failed to fetch data");
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    countryData: {},
    mediaData: [],
    page: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetGallery: (state) => {
      state.countryData = {};
      state.mediaData = [];
      state.page = 1;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        // If it's the first page, clear old media
        if (action.meta.arg.page === 1) {
          state.mediaData = [];
        }
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.countryData = action.payload.country;
        if (action.payload.page === 1) {
          state.mediaData = action.payload.media;
        } else {
          state.mediaData = [...state.mediaData, ...action.payload.media];
        }
        state.page = action.payload.page;
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGallery } = gallerySlice.actions;
export default gallerySlice.reducer;

