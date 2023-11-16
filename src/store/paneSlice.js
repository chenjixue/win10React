import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  banhide: true,
};

export const paneSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    BANDTOGG: state => {
      state.banhide = !state.banhide
    },
    BANDHIDE: state => {
      state.banhide = true
    }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
// export const { WALLNEXT } = wallpaperSlice.actions
export const paneSliceActions = paneSlice.actions
export default paneSlice.reducer