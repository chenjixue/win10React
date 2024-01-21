import { createSlice } from '@reduxjs/toolkit'
import { pinnedApps, recentApps } from "../utils";
const initialState = {
    pnApps: pinnedApps,
    rcApps: recentApps,
    query: "",
    activeName: "",
    hide: true,
};
export const searchmenuSlice = createSlice({
    name: 'searchmenu',
    initialState,
    reducers: {
        SEARCHCHAGE: (state, action) => {
            state.query = action.payload;
        },
        SEARCHACTIVE: (state, action) => {
            state.activeName = action.payload;
        },
        SEARCHSHOW: state => {
            state.menu = true;
            state.hide = false;
            state.pwctrl = false;
        },
        SEARCHHIDE: state => {
            state.hide = true;
            state.query = "";
            state.showAll = false;
            state.pwctrl = false;
        },
        SEARCHTOGG: state => {
            state.hide = !(state.hide || !state.menu);
            if (state.hide) {
                state.query = ""
            } else {

                state.query = action.payload;
            }
            state.menu = true;
            state.alpha = false;
            state.curAlpha = "A";
            state.pwctrl = false;
            state.showAll = state.menu && state.showAll ? true : null;
        },
        SEARCHALL: (state, action) => {
            state.showAll = !state.showAll;
            state.alpha = false;
            state.pwctrl = false;
            state.curAlpha = "A";
        },
        SEARCHALPHA: (state, action) => {
            state.alpha = !state.alpha;
            state.pwctrl = false;
            state.curAlpha = action.payload || "A";
        },
        SEARCHSRC: state => {
            state.hide = !(state.hide || state.menu);
            state.menu = false;
            state.pwctrl = false;
        },
        SEARCHPWC: state => {
            state.pwctrl = true;
        }
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const searchmenuSliceActions = searchmenuSlice.actions

export default searchmenuSlice.reducer