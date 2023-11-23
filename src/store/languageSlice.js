import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  language: 1
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    LANGUAGETOGG: (state, action) => {
      state.language = action.payload
    }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
// export const { WALLNEXT } = wallpaperSlice.actions 
export const languageSliceActions = languageSlice.actions
export default languageSlice.reducer