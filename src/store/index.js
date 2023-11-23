
import { configureStore } from '@reduxjs/toolkit'
import wallReducer from "./wallpaperSlice"
import taskReducer from "./taskbarSlice"
import appReducer from "./appSlice"
import settingsReducer from "./settingsSlice"
import widReducer from "./winpanSlice"
import paneReducer from "./paneSlice"
import soundReducer from "./soundSlice"
import languageReducer from "./languageSlice"
import networkReducer from "./networkSlice"
import calendarReducer from "./calendarSlice"
import { winpanSliceActions } from "./winpanSlice"
import { paneSliceActions } from "./paneSlice"
import { networkSliceActions } from "./networkSlice"
import { soundSliceActions } from "./soundSlice"
import { languageSliceActions } from "./languageSlice"
import { calendarSliceActions } from "./calendarSlice"
export let Actions = {
  ...winpanSliceActions,
  ...paneSliceActions,
  ...networkSliceActions,
  ...soundSliceActions,
  ...languageSliceActions,
  ...calendarSliceActions
}
export default configureStore({
  reducer: {
    sidepane: paneReducer,
    networkPane: networkReducer,
    soundPane: soundReducer,
    languagePane: languageReducer,
    wallpaper: wallReducer,
    taskbar: taskReducer,
    apps: appReducer,
    setting: settingsReducer,
    widpane: widReducer,
    calendarPane: calendarReducer,
  }
})