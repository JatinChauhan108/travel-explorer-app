import { configureStore } from "@reduxjs/toolkit";
import galleryProvider from "./gallerySlice";

const provider = configureStore({
    reducer : galleryProvider
})

export default provider;