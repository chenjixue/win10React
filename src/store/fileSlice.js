import { createSlice } from '@reduxjs/toolkit'
import { Bin } from "../utils/bin";
import fdata from "./dir.json";

let initialState = {
    cdir: "%user%",
    hist: [],
    hid: 0,
    view: 1,
};
initialState.hist.push(initialState.cdir);
initialState.data = new Bin();
initialState.data.parse(fdata);
var tmp = { ...initialState };
var navHist = false;
if (!navHist && tmp.cdir != tmp.hist[tmp.hid]) {
    tmp.hist.splice(tmp.hid + 1);
    tmp.hist.push(tmp.cdir);
    tmp.hid = tmp.hist.length - 1;
}
tmp.cdir = tmp.hist[tmp.hid];
if (tmp.cdir.includes("%")) {
    if (tmp.data.special[tmp.cdir] != null) {
        tmp.cdir = tmp.data.special[tmp.cdir];
        tmp[tmp.hid] = tmp.cdir;
    }
}
tmp.cpath = tmp.data.getPath(tmp.cdir);
initialState = tmp
export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        FILEDIR: (state, action) => {
        }
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
// export const { WALLNEXT } = wallpaperSlice.actions 
export const fileSliceActions = fileSlice.actions
export default fileSlice.reducer