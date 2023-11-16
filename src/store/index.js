
import { configureStore } from '@reduxjs/toolkit'
import wallReducer from "./wallpaperSlice"
import taskReducer from "./taskbarSlice"
import appReducer from "./appSlice"
import settingsReducer from "./settingsSlice"
import widReducer from "./winpanSlice"
import paneReducer from "./paneSlice"
import { winpanSliceActions } from "./winpanSlice"
import { paneSliceActions } from "./paneSlice"
export let Actions = {
  ...winpanSliceActions,
  ...paneSliceActions
}
export default configureStore({
  reducer: {
    sidepane: paneReducer,
    wallpaper: wallReducer,
    taskbar: taskReducer,
    apps: appReducer,
    setting: settingsReducer,
    widpane: widReducer,
  }
})