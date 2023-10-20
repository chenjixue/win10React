import { configureStore } from '@reduxjs/toolkit'
import wallReducer from "./wallpaperSlice"
export default configureStore({
  reducer: {
    wallpaper: wallReducer
  }
})