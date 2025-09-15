import { configureStore } from "@reduxjs/toolkit";
import galleryProvider from "./gallerySlice";
import favoritesProvider from "./favoritesSlice"
import authReducer from "./authSlice"

const provider = configureStore({
    reducer : {
        gallery : galleryProvider,
        favorites : favoritesProvider,
        auth : authReducer
    }
})

export default provider;