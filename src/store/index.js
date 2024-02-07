
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
import deskTopReducer from "./deskTopSlice"
import fileReducer from "./fileSlice"
import globalsReducer from "./globalsSlice"
import startmenuReducer from "./startmenuSlice"
import searchmenuReducer from "./searchmenuSlice";
import { winpanSliceActions } from "./winpanSlice"
import { paneSliceActions } from "./paneSlice"
import { networkSliceActions } from "./networkSlice"
import { soundSliceActions } from "./soundSlice"
import { languageSliceActions } from "./languageSlice"
import { calendarSliceActions } from "./calendarSlice"
import { deskTopSliceActions } from "./deskTopSlice"
import { globalsSliceActions } from "./globalsSlice"
import { startmenuSliceActions } from "./startmenuSlice"
import { searchmenuSliceActions } from "./searchmenuSlice"
import { wallpaperSliceActions } from "./wallpaperSlice"
export let Actions = {
  ...winpanSliceActions,
  ...paneSliceActions,
  ...networkSliceActions,
  ...soundSliceActions,
  ...languageSliceActions,
  ...calendarSliceActions,
  ...deskTopSliceActions,
  ...globalsSliceActions,
  ...startmenuSliceActions,
  ...searchmenuSliceActions,
  ...wallpaperSliceActions
}
export default configureStore({
  reducer: {
    sidepane: paneReducer,
    networkPane: networkReducer,
    soundPane: soundReducer,
    languagePane: languageReducer,
    wallpaper: wallReducer,
    taskbar: taskReducer,
    desktop: deskTopReducer,
    apps: appReducer,
    setting: settingsReducer,
    widpane: widReducer,
    calendarPane: calendarReducer,
    files: fileReducer,
    globals: globalsReducer,
    startmenu: startmenuReducer,
    searchmenu: searchmenuReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})