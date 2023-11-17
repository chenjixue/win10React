
import { configureStore } from '@reduxjs/toolkit'
import wallReducer from "./wallpaperSlice"
import taskReducer from "./taskbarSlice"
import appReducer from "./appSlice"
import settingsReducer from "./settingsSlice"
import widReducer from "./winpanSlice"
import paneReducer from "./paneSlice"
import soundReducer from "./soundSlice"
import networkReducer from "./networkSlice"
import { winpanSliceActions } from "./winpanSlice"
import { paneSliceActions } from "./paneSlice"
import { networkSliceActions } from "./networkSlice"
import { soundSliceActions } from "./soundSlice"
export let Actions = {
  ...winpanSliceActions,
  ...paneSliceActions,
  ...networkSliceActions,
  ...soundSliceActions
}
export default configureStore({
  reducer: {
    sidepane: paneReducer,
    networkPane: networkReducer,
    soundPane:soundReducer,
    wallpaper: wallReducer,
    taskbar: taskReducer,
    apps: appReducer,
    setting: settingsReducer,
    widpane: widReducer,
  }
})