import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    countryData : {},
    mediaData : [],
    loading : false, 
    error : null,
}


const gallerySlice = createSlice({
    name : 'galleryData',
    initialState,
    reducers : {
        startLoading : (state) => {
            state.loading = true;
            state.countryData = {};
            state.mediaData = [];
            state.error = false;
        },
        changeCountry : (state, action) => {
            state.countryData = action.payload
        },
        changeMedia : (state, action) => {
            state.mediaData = action.payload
            state.loading = false;
        },
        setError : (state, action) => {
            state.error = action.payload;
            state.loading = false
        }
    }
})

export const {changeCountry, changeMedia, startLoading, setError} = gallerySlice.actions;

export default gallerySlice.reducer;