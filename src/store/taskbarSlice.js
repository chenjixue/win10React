import { createSlice } from '@reduxjs/toolkit'
import { taskApps } from "../utils";
const initialState = {
    apps: taskApps,
    align: "center",
    winStart: true,
    audio: 3,
};
export const taskbarSlice = createSlice({
    name: 'taskbar',
    initialState,
    reducers: {
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
// export const { WALLNEXT } = wallpaperSlice.actions

export default taskbarSlice.reducer