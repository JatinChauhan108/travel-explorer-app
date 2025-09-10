import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    countryData : {},
    mediaData : [],
    loading : false
}


const gallerySlice = createSlice({
    name : 'galleryData',
    initialState,
    reducers : {
        startLoading : (state) => {
            state.loading = true;
            state.countryData = {};
            state.mediaData = [];
        },
        changeCountry : (state, action) => {
            state.countryData = action.payload
        },
        changeMedia : (state, action) => {
            state.mediaData = action.payload
            state.loading = false;
        }
    }
})

export const {changeCountry, changeMedia, startLoading} = gallerySlice.actions;

export default gallerySlice.reducer;