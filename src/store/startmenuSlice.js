import { createSlice } from '@reduxjs/toolkit'
import { pinnedApps, recentApps } from "../utils";
const initialState = {
    activeControlButton: "",
    pnApps: pinnedApps,
    rcApps: recentApps,
    hide: true,
    menu: false,
    showAll: false,
    alpha: false,
    pwctrl: false,
    curAlpha: "A",
    qksrch: [
        ["faClock", 1, "Today in history"],
        ["faChartLine", null, "Markets today"],
        ["faFilm", null, "New movies"],
        ["faNewspaper", 1, "Top news"],
    ],
};
export const startmenuSlice = createSlice({
    name: 'startmenu',
    initialState,
    reducers: {
        STARTCHANGECONTROL: (state, action) => {
            state.activeControlButton = action.payload
        },
        STARTSHW: state => {
            state.menu = true;
            state.hide = false;
            state.pwctrl = false;
        },
        STARTHIDE: state => {
            state.hide = true;
            state.showAll = false;
            state.pwctrl = false;
        },
        STARTOGG: (state, action) => {
            state.hide = !(state.hide || !state.menu);
            state.menu = true;
            state.alpha = false;
            state.curAlpha = "A";
            state.pwctrl = false;
            state.showAll = state.menu && state.showAll ? true : null;
        },
        STARTALL: (state, action) => {
            state.showAll = !state.showAll;
            state.alpha = false;
            state.pwctrl = false;
            state.curAlpha = "A";
        },
        STARTALPHA: (state, action) => {
            state.alpha = !state.alpha;
            state.pwctrl = false;
            state.curAlpha = action.payload || "A";
        },
        STARTSRC: state => {
            state.hide = !(state.hide || state.menu);
            state.menu = false;
            state.pwctrl = false;
        },
        STARTPWC: state => {
            state.pwctrl = true;
        }
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const startmenuSliceActions = startmenuSlice.actions

export default startmenuSlice.reducer