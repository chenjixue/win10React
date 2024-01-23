import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../utils/general";
import { Actions } from "@/store"

export const EfficientWorkApp = ({ src, title, iconSize, payload, click }) => {
  const dispatch = useDispatch();
  const clickDispatch = (event) => {
    // event.stopPropagation()
    let actionName = event.currentTarget.dataset.action
    let createAction = Actions[actionName]
    let payload = event.currentTarget.dataset.payload
    if (createAction) {
      dispatch(createAction(payload));
    } else if (actionName) {
      let action = {
        type: actionName,
        payload
      }

      dispatch(action)
    }
  };
  return (
    <div className="efficientWorkApp" style={{ "--prefix": "no" }} data-payload={payload} data-action={click} onClick={clickDispatch}>
      <div className="efficientWorkAppIcon">
        <Icon src={src} width={iconSize} ></Icon>
      </div>
      <div className="efficientWorkAppTitle">{title}</div>
    </div>
  )
}
const MenuItemSelects = ({ options }) => {

  let options = options.map(
    option => {
      return <div className="startItem">
        <Icon className="settingIcon" src="startKaijijian" width={16} />
        <span>电源</span>
      </div>
    }
  )
  return (<div>
    {options}
  </div>)
}
export const StartMenu = () => {
  const { align } = useSelector((state) => state.taskbar);
  const start = useSelector((state) => {
    var arr = JSON.parse(JSON.stringify(state.startmenu)),
      ln = (6 - (arr.pnApps.length % 6)) % 6;

    for (var i = 0; i < ln; i++) {
      arr.pnApps.push({
        empty: true,
      })
    }
    for (i = 0; i < arr.rcApps.length; i++) {
      if (arr.rcApps[i].lastUsed < 0) {
        arr.rcApps[i].lastUsed = "Recently Added";
      } else if (arr.rcApps[i].lastUsed < 10) {
        arr.rcApps[i].lastUsed = "Just Now";
      } else if (arr.rcApps[i].lastUsed < 60) {
        arr.rcApps[i].lastUsed += "m ago";
      } else if (arr.rcApps[i].lastUsed < 360) {
        arr.rcApps[i].lastUsed =
          Math.floor(arr.rcApps[i].lastUsed / 60) + "h ago";
      }
    }
    var allApps = [],
      tmpApps = Object.keys(state.apps)
        .filter((x) => x != "hz" && x != "appOrder")
        .map((key) => {
          return state.apps[key];
        });

    tmpApps.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

    for (i = 0; i < 27; i++) {
      allApps[i] = [];
    }

    for (i = 0; i < tmpApps.length; i++) {
      var t1 = tmpApps[i].name.trim().toUpperCase().charCodeAt(0);
      if (t1 > 64 && t1 < 91) {
        allApps[t1 - 64].push(tmpApps[i]);
      } else {
        allApps[0].push(tmpApps[i]);
      }
    }

    arr.contApps = allApps;
    arr.allApps = tmpApps;
    return arr;
  });
  const dispatch = useDispatch();

  const clickDispatch = (event) => {
    let type = event.currentTarget.dataset.action;
    let payload = event.currentTarget.dataset.payload;
    let action = {
      type,
      payload
    }
    let createAction = Actions[type]
    if (createAction) {
      dispatch(createAction(payload));
      // dispatch(Actions.STARTHIDE())
    } else if (type) {
      let action = {
        type,
        payload
      }
      dispatch(action)
      // dispatch(Actions.STARTHIDE())
    }

    if (
      action.type &&
      (action.payload == "full" || action.type == "EDGELINK")
    ) {
      dispatch(
        Actions["STARTHIDE"]
      );
    }

    if (action.type == "STARTALPHA") {
      var target = document.getElementById("char" + action.payload);
      if (target) {
        target.parentNode.scrollTop = target.offsetTop;
      } else {
        var target = document.getElementById("charA");
        target.parentNode.scrollTop = 0;
      }
    }

  };
  return (
    <div
      className="startMenu dpShad"
      data-hide={start.hide}
      style={{ "--prefix": "START" }}
      data-align={align}
    >
      <div className="menuBox">
        <div className="startControlBox">
          <div className="startItem" style={{ marginBottom: "auto" }}>
            <Icon className="settingIcon" src="startLine" width={20} />
            <span style={{ color: "#000", fontWeight: "550" }}>开始</span>
          </div>
          <div className="startItem">
            <Icon className="settingIcon" src="startAcount" width={26} />
            <span>admin</span>
          </div>
          <div className="startItem">
            <Icon className="settingIcon" src="startFile" width={22} />
            <span>文档</span>
          </div>
          <div className="startItem">
            <Icon className="settingIcon" src="startImage" width={18} />
            <span>图片</span>
          </div>
          <div className="startItem">
            <Icon className="settingIcon" src="startSetting" width={16} />
            <span>设置</span>
          </div>
          <div className="startItem">
            <Icon className="settingIcon" src="startKaijijian" width={16} />
            <span>电源</span>
          </div>
          <div className="rightShadow"></div>
        </div>
        <div className="allCont" data-allapps={true}>
          <div className="appCont">
            <div className="allApps win11Scroll" data-alpha={start.alpha}>
              {start.contApps.map((ldx, i) => {
                if (ldx.length == 0) return null;

                var tpApps = [];
                tpApps.push(
                  <div
                    key={i}
                    className="allApp prtclk"
                    data-action="STARTALPHA"
                    onClick={clickDispatch}
                    id={`char${i == 0 ? "#" : String.fromCharCode(i + 64)}`}
                  >
                    <div className="ltName">
                      {i == 0 ? "#" : String.fromCharCode(i + 64)}
                    </div>
                  </div>,
                );

                ldx.forEach((app, j) => {
                  tpApps.push(
                    <div
                      key={app.name}
                      className="allApp prtclk"
                      onClick={clickDispatch}
                      data-action={app.action}
                      data-payload={app.payload || "full"}
                    >
                      <Icon className="pnIcon" src={app.icon} width={24} />
                      <div className="appName">{app.name}</div>
                    </div>,
                  );
                });

                return tpApps;
              })}
            </div>
            <div className="alphaBox" data-alpha={start.alpha}>
              <div className="alphaCont">
                <div className="dullApp allApp">
                  <div className="ltName">&</div>
                </div>
                {start.contApps.map((ldx, i) => {
                  return (
                    <div
                      key={i}
                      className={
                        ldx.length == 0 ? "dullApp allApp" : "allApp prtclk"
                      }
                      data-action="STARTALPHA"
                      onClick={ldx.length == 0 ? null : clickDispatch}
                      data-payload={
                        i == 0 ? "#" : String.fromCharCode(i + 64)
                      }
                    >
                      <div className="ltName">
                        {i == 0 ? "#" : String.fromCharCode(i + 64)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="highEfficientWork">
          <div className="title">高效工作</div>
          <div className="efficientWorkAppBox">
            <EfficientWorkApp src="efficientWorkOffice" title="Microsoft 365 应用" iconSize={34} payload={"full"} />
            <EfficientWorkApp src="efficientWorkEdge" title="Microsoft edg" iconSize={40} click={"MSEDGE"} payload={"full"} />
          </div>
          <div className="title">浏览</div>
          <div className="efficientWorkAppBox">
            <EfficientWorkApp src="efficientWorkStore" title="Microsoft store" iconSize={34} click={"WNSTORE"} payload={"full"} />
          </div>
        </div>
      </div>
    </div>
  );
};
