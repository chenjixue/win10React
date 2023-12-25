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
const changeVal = (obj, path, val = "togg") => {
  var tmp = obj;
  path = path.split(".");
  for (var i = 0; i < path.length - 1; i++) {
    tmp = tmp[path[i]];
  }

  if (val == "togg") {
    tmp[path[path.length - 1]] = !tmp[path[path.length - 1]];
  } else {
    tmp[path[path.length - 1]] = val;
  }

  return obj;
};
export const settingSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    STNGTHEME: (state, action) => {
      state.person.theme = action.payload;
    },
    STNGTOGG: (state, action) => {
      state.person.theme = action.payload;
      changeVal(state, action.payload);
      localStorage.setItem("setting", JSON.stringify(state));
    },
    STNGSETV: (state, action) => {
      changeVal(tmpState, action.payload.path, action.payload.value);
      localStorage.setItem("setting", JSON.stringify(state));
    },
    SETTLOAD: (state, action) => {
      
    }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
// export const { WALLNEXT } = wallpaperSlice.actions

export default settingSlice.reducer