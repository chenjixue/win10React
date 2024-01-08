import { createSlice } from '@reduxjs/toolkit'
import { taskApps } from "../utils";
import { appSlice } from "./appSlice"
import store from "@/store";
let isInit = true
// let getAppOrder = () => {
//     let temApps = isInit ? appSlice.getInitialState() : store.getState().apps
//     let isShowApp = key => {
//         console.log("🚀 ~ file: taskbarSlice.js:9 ~ isShowApp ~ temApps[key].hide:", temApps[key].hide)
//         return key != "hz" && key != "undefined" && !temApps[key].task && !temApps[key].hide
//     }
//     let appObjects = Object.keys(temApps).filter(isShowApp).map(key => temApps[key])
//     let appOrder = [...taskApps, ...appObjects]
//     return appOrder
// }

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
        ORDERAPP: (state, action) => {
            state.appOrder = action.payload
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