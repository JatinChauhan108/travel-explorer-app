import { configureStore } from "@reduxjs/toolkit";
import galleryProvider from "./gallerySlice";
import favoritesProvider from "./favoritesSlice"

const provider = configureStore({
    reducer : {
        gallery : galleryProvider,
        favorites : favoritesProvider
    }
})

export default provider;