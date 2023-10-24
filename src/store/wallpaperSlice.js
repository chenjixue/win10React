import { createSlice } from '@reduxjs/toolkit'
var wps = localStorage.getItem("wps") || 0;
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
};
export const wallpaperSlice = createSlice({
    name: 'wallpaper',
    initialState,
    reducers: {
        // increment: state => {
        //     // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
        //     // 并不是真正的改变状态值，因为它使用了 Immer 库
        //     // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
        //     // 不可变的状态
        //     state.value += 1
        // },
        // decrement: state => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // }
        WALLNEXT: state => {
            var twps = (state.wps + 1) % walls.length;
            localStorage.setItem("wps", twps);
            state.src = walls[twps]
        },
        // WALLSET: (state, { payload }) => {
        //     var isIndex = !Number.isNaN(parseInt(action.payload)),
        //         wps = 0,
        //         src = "";
        //     if (isIndex) {
        //         wps = action.payload;
        //         src = walls[action.payload];
        //     } else {
        //         src = action.payload;
        //         wps = walls.indexOf(action.payload);
        //     }
        // }
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { WALLNEXT } = wallpaperSlice.actions

export default wallpaperSlice.reducer