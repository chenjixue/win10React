import { desktopApps } from "@/utils";
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  apps: desktopApps,
  hide: false,
  size: 1,
  sort: "none",
  abOpen: false,
};
export const deskTopSlice = createSlice({
  name: 'deskTop',
  initialState,
  reducers: {
    DESKREM: (state, action) => {
      let arr = state.apps.filter((x) => x.name != action.payload);
      localStorage.setItem("desktop", JSON.stringify(arr.map((x) => x.name)));
      state.apps = arr
    },
    DESKADD:(state,action) =>{
      let arr = [...state.apps];
      arr.push(action.payload);
      state.apps = arr
      localStorage.setItem("desktop", JSON.stringify(arr.map((x) => x.name)));
    }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
// export const { WALLNEXT } = wallpaperSlice.actions 
export const deskTopSliceActions = deskTopSlice.actions
export default deskTopSlice.reducer