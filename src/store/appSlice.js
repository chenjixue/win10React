import { allApps, taskApps } from "@/utils";
import { createSlice } from '@reduxjs/toolkit'
const initialState = {};
for (var i = 0; i < allApps.length; i++) {
  initialState[allApps[i].icon] = { ...allApps[i] };
  initialState[allApps[i].icon].size = "full";
  initialState[allApps[i].icon].hide = true;
  initialState[allApps[i].icon].max = null;
  initialState[allApps[i].icon].z = 0;
}
initialState.hz = 2;
initialState.appOrder = taskApps
const appReducer = (state = initialState, action) => {
  var tmpState = { ...state }
  if (action.type == "EDGELINK") {
    var obj = { ...tmpState["edge"] };
    if (action.payload && action.payload.startsWith("http")) {
      obj.url = action.payload;
    } else if (action.payload && action.payload.length != 0) {
      obj.url = "https://www.bing.com/search?q=" + action.payload;
    } else {
      obj.url = null;
    }

    obj.size = "full";
    obj.hide = false;
    obj.max = true;
    tmpState.hz += 1;
    obj.z = tmpState.hz;
    tmpState["edge"] = obj;
    return tmpState;
  } else if (action.type == "SHOWDSK") {
    var keys = Object.keys(tmpState);

    for (var i = 0; i < keys.length; i++) {
      var obj = tmpState[keys[i]];
      if (obj.hide == false) {
        obj.max = false;
        if (obj.z == tmpState.hz) {
          tmpState.hz -= 1;
        }
        obj.z = -1;
        tmpState[keys[i]] = obj;
      }
    }

    return tmpState;
  } else if (action.type == "EXTERNAL") {
    window.open(action.payload, "_blank");
  } else if (action.type == "OPENTERM") {
    var obj = { ...tmpState["terminal"] };
    obj.dir = action.payload;

    obj.size = "full";
    obj.hide = false;
    obj.max = true;
    tmpState.hz += 1;
    obj.z = tmpState.hz;
    tmpState["terminal"] = obj;
    return tmpState;
  } else if (action.type == "ADDAPP") {
    tmpState[action.payload.icon] = action.payload;
    tmpState[action.payload.icon].size = "full";
    tmpState[action.payload.icon].hide = true;
    tmpState[action.payload.icon].max = null;
    tmpState[action.payload.icon].z = 0;

    return tmpState;
  } else if (action.type == "DELAPP") {
    delete tmpState[action.payload];
    return tmpState;
  } else if (action.type == "ORDERAPP") {
    tmpState.appOrder = action.payload
    return tmpState
  } else {
    var keys = Object.keys(state);
    for (var i = 0; i < keys.length; i++) {
      var obj = { ...state[keys[i]] };
      if (obj.action == action.type) {
        if (action.payload == "full") {
          let appIndex = tmpState.appOrder.findIndex(item => item.action == obj.action)
          if (obj.hide && appIndex === -1) {
            let newAppOrder = [...tmpState.appOrder]
            newAppOrder.push(obj)
            tmpState.appOrder = newAppOrder
          }
          obj.size = "full";
          obj.hide = false;
          obj.max = true;
          tmpState.hz += 1;
          obj.z = tmpState.hz;
        } else if (action.payload == "barClickShow") {
          obj.size = obj.size && "full";
          obj.hide = false;
          obj.max = true;
          tmpState.hz += 1;
          obj.z = tmpState.hz;
        } else if (action.payload == "close") {
          let isTaskbarIcon = taskApps.findIndex(item => item.action == obj.action)
          if (!obj.hide && isTaskbarIcon == -1) {
            let closeAppIndex = tmpState.appOrder.findIndex(item => item.action == obj.action)
            if (closeAppIndex !== -1) {

              let newAppOrder = [...tmpState.appOrder]
              newAppOrder.splice(closeAppIndex, 1)
              tmpState.appOrder = newAppOrder
            }
          }

          obj.hide = true;
          obj.max = null;
          obj.z = -1;
          tmpState.hz -= 1;

        } else if (action.payload == "mxmz") {
          obj.size = ["mini", "full"][obj.size != "full" ? 1 : 0];
          obj.hide = false;
          obj.max = true;
          tmpState.hz += 1;
          obj.z = tmpState.hz;
        } else if (action.payload == "togg") {
          if (obj.z != tmpState.hz) {
            obj.hide = false;
            // if (!obj.max) {
            //   tmpState.hz += 1;
            //   obj.z = tmpState.hz;
            //   obj.max = true;
            // } else {
            //   obj.z = -1;
            //   obj.max = false;
            // }
            tmpState.hz += 1;
            obj.z = tmpState.hz;
            obj.max = true;
          } else {
            obj.max = !obj.max;
            obj.hide = false;
            if (obj.max) {
              tmpState.hz += 1;
              obj.z = tmpState.hz;
            } else {
              obj.z = -1;
              tmpState.hz -= 1;
            }
          }
        } else if (action.payload == "mnmz") {
          obj.max = false;
          obj.hide = false;
          if (obj.z == tmpState.hz) {
            tmpState.hz -= 1;
          }
          obj.z = -1;
        } else if (action.payload == "resize") {
          obj.size = "cstm";
          obj.hide = false;
          obj.max = true;
          if (obj.z != tmpState.hz) tmpState.hz += 1;
          obj.z = tmpState.hz;
          obj.dim = action.dim;
        } else if (action.payload == "front") {
          obj.hide = false;
          obj.max = true;
          if (obj.z != tmpState.hz) {
            tmpState.hz += 1;
            obj.z = tmpState.hz;
          }
        }

        tmpState[keys[i]] = obj;
        return tmpState;
      }
    }
  }

  return state;
};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
// export const { WALLNEXT } = wallpaperSlice.actions
// export const appSliceActions = appSlice.actions
// export const temApps = initialState
export default appReducer;