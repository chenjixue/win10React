import { allApps } from "../utils";
import { createSlice } from '@reduxjs/toolkit'
var dev = "";
if (import.meta.env.MODE == "development") {
  dev = ""; // set the name (lowercase) of the app you are developing so that it will be opened on refresh
}

const initialState = {};
for (var i = 0; i < allApps.length; i++) {
  initialState[allApps[i].icon] = { ...allApps[i] };
  initialState[allApps[i].icon].size = "full";
  initialState[allApps[i].icon].hide = true;
  initialState[allApps[i].icon].max = null;
  initialState[allApps[i].icon].z = 0;

  if (allApps[i].icon == dev) {
    initialState[allApps[i].icon].size = "mini";
    initialState[allApps[i].icon].hide = false;
    initialState[allApps[i].icon].max = true;
    initialState[allApps[i].icon].z = 1;
  }
}
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
  }
})
console.log(appSlice,"appSlice---")
// 每个 case reducer 函数会生成对应的 Action creators
// export const { WALLNEXT } = wallpaperSlice.actions

export default appSlice.reducer