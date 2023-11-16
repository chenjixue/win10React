import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  banhide: false,
  isAirMode: false
};

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    NETWORKTOGG: state => {
      state.banhide = !state.banhide
    },
    NETWORKHIDE: state => {
      state.banhide = true
    },
    AIRMODETOGG: state => {
      state.isAirMode = !state.isAirMode
    }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
// export const { WALLNEXT } = wallpaperSlice.actions
export const networkSliceActions = networkSlice.actions
export default networkSlice.reducer