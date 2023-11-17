import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  audio: 3,
  banhide: true
};

export const soundSlice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    TASKAUDO: (state, action) => {
      state.audio = action.payload
    },
    SOUNDHIDE: state => {
      state.banhide = true
    },
    SOUNDTOGG: state => {
      state.banhide = !state.banhide
    }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
// export const { WALLNEXT } = wallpaperSlice.actions 
export const soundSliceActions = soundSlice.actions
export default soundSlice.reducer