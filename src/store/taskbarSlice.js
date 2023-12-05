import { createSlice } from '@reduxjs/toolkit'
import { taskApps } from "../utils";
import { appSlice } from "./appSlice"
let temApps =appSlice.getInitialState()
let isShowApp = key => key != "hz" && key != "undefined" && !temApps[key].task && !temApps[key].hide
let appObjects = Object.keys(temApps).filter(isShowApp).map(key => temApps[key])
let appOrder = [...taskApps, ...appObjects]
const initialState = {
    apps: taskApps,
    align: "center",
    winStart: true,
    taskIconMoveEnter: false,
    audio: 3,
    appOrder
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
        ORDERAPP: (state, action) => {
            state.appOrder = action.payload
        }
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { MOUSELEAVE, MOUSEENTER, ORDERAPP } = taskbarSlice.actions
export default taskbarSlice.reducer