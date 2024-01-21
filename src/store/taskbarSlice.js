import { createSlice } from '@reduxjs/toolkit'
import { taskApps } from "../utils";
const initialState = {
    apps: taskApps,
    align: "left",
    winStart: true,
    taskIconMoveEnter: false,
    audio: 3,
    // appOrder: getAppOrder()
};
export const taskbarSlice = createSlice({
    name: 'taskbar',
    initialState,
    reducers: {
        MOUSELEAVE: (state) => {
            state.taskIconMoveEnter = false
        },
        MOUSEENTER: (state) => {
            state.taskIconMoveEnter = true
        },
        //refresh taskbar bottom icon
        // REFRESH: (state, action) => {
        //     isInit = false
        //     state.appOrder = getAppOrder()
        // },


    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { MOUSELEAVE, MOUSEENTER, ORDERAPP, REFRESH } = taskbarSlice.actions
export default taskbarSlice.reducer