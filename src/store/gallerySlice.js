import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    countryData : null,
    mediaData : null
}


const gallerySlice = createSlice({
    name : 'galleryData',
    initialState,
    reducers : {
        changeCountry : (state, action) => {
            state.countryData = action.payload
        },
        changeMedia : (state, action) => {
            state.mediaData = action.payload
        }
    }
})

export const {changeCountry, changeMedia} = gallerySlice.actions;

export default gallerySlice.reducer;