import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    hide: true,
    data: {
        temp: null,
        weatherImg: '',
        capAbbr: ''
    }
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
        }
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const winpanSliceActions = winpanSlice.actions

export default winpanSlice.reducer