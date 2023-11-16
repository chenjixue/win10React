import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    hide: true,
    data: {
        temp: null,
        weatherImg: '',
        capAbbr: ''
    },
    fold: false,
    controlIcons: [
        {
            src: "location",
            width: 20,
            text: "定位",
            isOpen: false,
        },
        {
            src: "bluetooth",
            width: 16,
            text: "蓝牙",
            isOpen: false
        },
        {
            src: "darkMode",
            width: 20,
            text: "夜间模式",
            isOpen: false
        },
        {
            src: "airplaneMode",
            width: 20,
            text: "飞行模式",
            isOpen: false
        },
        {
            src: "setting",
            width: 22,
            text: "所有设置",
            isOpen: false
        },
        {
            src: "wifiSetting",
            width: 24,
            text: "网络",
            isOpen: false
        },
        {
            src: "focusAssitant",
            width: 20,
            text: "专注助手",
            isOpen: false
        },
    ]
};
export const winpanSlice = createSlice({
    name: 'winpan',
    initialState,
    reducers: {
        WIDGHIDE: state => {
            state.hide = true
        },
        WIDGTOGG: state => {
            state.hide = !state.hide
        },
        WINSETTING: (state, action) => {
            state.data = action.payload
        },
        ICONOPEN: (state, action) => {
            state.controlIcons.forEach(item => {
                if (item.src == action.payload) {
                    item.isOpen = !item.isOpen
                }
            })
        },
        WIDGFOLD: state => {
            state.fold = !state.fold
        }
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const winpanSliceActions = winpanSlice.actions

export default winpanSlice.reducer