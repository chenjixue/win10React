
import { configureStore } from '@reduxjs/toolkit'
import wallReducer from "./wallpaperSlice"
import taskReducer from "./taskbarSlice"
import appReducer from "./appSlice"
import settingsReducer from "./settingsSlice"
import widReducer from "./winpanSlice"
import { winpanSliceActions } from "./winpanSlice"
export let Actions = {
  ...winpanSliceActions
}
export default configureStore({
  reducer: {
    wallpaper: wallReducer,
    taskbar: taskReducer,
    apps: appReducer,
    setting: settingsReducer,
    widpane: widReducer
  }
})