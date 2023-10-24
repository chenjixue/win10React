import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  system: {
    power: {
      saver: {
        state: false,
      },
      battery: 100,
    },
    display: {
      brightness: 100,
      nightlight: {
        state: false,
      },
      connect: false,
    },
  },
  person: {
    name: "Blue Edge",
    theme: "light",
    color: "blue",
  },
  devices: {
    bluetooth: false,
  },
  network: {
    wifi: {
      state: true,
    },
    airplane: false,
  },
  privacy: {
    location: {
      state: false,
    },
  },
};

document.body.dataset.theme = initialState.person.theme;
export const settingSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
// export const { WALLNEXT } = wallpaperSlice.actions

export default settingSlice.reducer