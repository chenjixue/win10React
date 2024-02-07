import { createSlice } from '@reduxjs/toolkit'
var wps = localStorage.getItem("wps") || 3;
var locked = localStorage.getItem("locked");
const walls = [
    "default/img0.jpg",
    "dark/img0.jpg",
    "ThemeA/img0.jpg",
    "ThemeA/img1.jpg",
    "ThemeA/img2.jpg",
    "ThemeA/img3.jpg",
    "ThemeB/img0.jpg",
    "ThemeB/img1.jpg",
    "ThemeB/img2.jpg",
    "ThemeB/img3.jpg",
    "ThemeC/img0.jpg",
    "ThemeC/img1.jpg",
    "ThemeC/img2.jpg",
    "ThemeC/img3.jpg",
    "ThemeD/img0.jpg",
    "ThemeD/img1.jpg",
    "ThemeD/img2.jpg",
    "ThemeD/img3.jpg",
];
const initialState = {
    wps,
    src: walls[wps],
    locked: !(locked == "false"),
    booted: false || import.meta.env.MODE == "development",
    dir: 0
};
export const wallpaperSlice = createSlice({
    name: 'wallpaper',
    initialState,
    reducers: {
        WALLUNLOCK: state => {
            localStorage.setItem("locked", false);
            state.locked = false
            state.dir = 0
        },
        WALLNEXT: state => {
            var twps = (state.wps + 1) % walls.length;
            localStorage.setItem("wps", twps);
            state.src = walls[twps]
        },
        WALLALOCK: state => {
            state.locked = true
            state.dir = -1
        },
        WALLBOOTED: state => {
            state.booted = true
            state.dir = 0
        },
        WALLRESTART: state => {
            state.booted = false
            state.locked = true
            state.dir = -1
        },
        WALLSHUTDN: state => {
            state.booted = false
            state.locked = true
            state.dir = -1
        },
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const wallpaperSliceActions = wallpaperSlice.actions

export default wallpaperSlice.reducer