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
const fileReducer = (state = initialState, action) => {
  // Object.preventExtensions(state)
  var tmp = { ...state };
  var navHist = false;
  if (action.type === "FILEDIR") {
    tmp.cdir = action.payload;
  } else if (action.type === "FILEPATH") {
    var pathid = tmp.data.parsePath(action.payload);
    if (pathid) tmp.cdir = pathid;
  } else if (action.type === "FILEBACK") {
    var item = tmp.data.getId(tmp.cdir);
    if (item.host) {
      tmp.cdir = item.host.id;
    }
  } else if (action.type === "FILEVIEW") {
    tmp.view = action.payload;
  } else if (action.type === "FILEPREV") {
    tmp.hid--;
    if (tmp.hid < 0) tmp.hid = 0;
    navHist = true;
  } else if (action.type === "FILENEXT") {
    tmp.hid++;
    if (tmp.hid > tmp.hist.length - 1) tmp.hid = tmp.hist.length - 1;
    navHist = true;
  }
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
  Object.freeze(tmp);
  return tmp;
};
// 每个 case reducer 函数会生成对应的 Action creators
// export const { WALLNEXT } = wallpaperSlice.actions 
// export const fileSliceActions = fileSlice.actions
export default fileReducer