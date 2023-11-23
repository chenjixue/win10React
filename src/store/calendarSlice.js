import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
const initialState = {
  banhide: true,
  currentMouth: dayjs().format('YYYY年MM月')
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    CALENDARTOGG: state => {
      state.banhide = !state.banhide
    },
    CALENDARHIDE: state => {
      state.banhide = true
    },
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
// export const { WALLNEXT } = wallpaperSlice.actions 
export const calendarSliceActions = calendarSlice.actions
export default calendarSlice.reducer