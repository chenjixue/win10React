import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../utils/general";
import { ControlIcon } from "@/components/start/widget.jsx"
import { Actions } from "@/store"
import "./startmenu.scss";
import "./sidepane.scss";
export * from "./widget";
export const DesktopApp = () => {
  const deskApps = useSelector((state) => {
    var arr = { ...state.desktop };
    var tmpApps = [...arr.apps];

    if (arr.sort == "name") {
      tmpApps.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    } else if (arr.sort == "size") {
      tmpApps.sort((a, b) => {
        var anm = a.name,
          bnm = b.name;

        return anm[bnm.charCodeAt(0) % anm.length] >
          bnm[anm.charCodeAt(0) % bnm.length]
          ? 1
          : -1;
      });
    } else if (arr.sort == "date") {
      tmpApps.sort((a, b) => {
        var anm = a.name,
          bnm = b.name;
        var anml = anm.length,
          bnml = bnm.length;

        return anm[(bnml * 13) % anm.length] > bnm[(anml * 17) % bnm.length]
          ? 1
          : -1;
      });
    }

    arr.apps = tmpApps;
    return arr;
  });
  return (
    <div className="desktopCont">
      {!deskApps.hide &&
        deskApps.apps.map((app, i) => {
          return (
            // to allow it to be focusable (:focus)
            <div key={i} className="dskApp" tabIndex={0}>
              <Icon
                click={app.action}
                className="dskIcon prtclk"
                src={app.icon}
                payload={app.payload || "full"}
                pr
                width={Math.round(deskApps.size * 36)}
                menu="app"
              />
              <div className="appName">{app.name}</div>
            </div>
          );
        })}
    </div>
  );
};
export const BandPane = () => {
  const sidepane = useSelector((state) => state.sidepane);

  return (
    <div
      className="bandpane dpShad"
      data-hide={sidepane.banhide}
      style={{ "--prefix": "BAND" }}
    >
      <div className="bandContainer">
        <Icon
          className="hvlight"
          width={17}
          click="CALCUAPP"
          payload="togg"
          open="true"
          src="calculator"
        />
        <Icon
          className="hvlight"
          width={17}
          click="SPOTIFY"
          payload="togg"
          open="true"
          src="spotify"
        />
        <Icon
          className="hvlight"
          width={17}
          click="NOTEPAD"
          payload="togg"
          src="notepad"
        />
      </div>
    </div>
  );
};
export const NetWorkPane = () => {
  const networkPane = useSelector((state) => state.networkPane);
  let iconOptions = {
    src: "airplaneMode",
    width: 20,
    text: "飞行模式",
    isOpen: networkPane.isAirMode
  }
  return (
    <div
      className="pane dpShad"
      data-hide={networkPane.banhide}
      style={{ "--prefix": "NETWORK" }}
    >
      <div className="bandContainer">
        <div className="network">
          <Icon
            width={29}
            className="networkIcon"
            src="network"
          />
          <div>
            <div className="topText">TP-LIKE_376E</div>
            <div className="bottomText">已连接</div>
          </div>
        </div>
        <div className="networkSetText">网络和互联网设置</div>
        <div className="networkSetTipText">更改设置，例如将某连接设置为按流量计费</div>
        <div className="networkIconContainer">
          <ControlIcon   {...iconOptions} data-action="AIRMODETOGG" />
        </div>
      </div>
    </div>
  );
};
export const SoundPane = () => {
  const dispatch = useDispatch();
  const setVolume = (e) => {
    var aud = 3;
    if (e.target.value < 70) aud = 2;
    if (e.target.value < 30) aud = 1;
    if (e.target.value == 0) aud = 0;
    
    dispatch(Actions['TASKAUDO'](aud));

    // sliderBackground(vSlider, e.target.value);
  };
  const soundPane = useSelector((state) => state.soundPane);
  return (
    <div
      className="pane dpShad"
      data-hide={soundPane.banhide}
      style={{ "--prefix": "SOUND" }}
    >
      <div className="bandContainer">
        <div className="sliderCont">
          <Icon className="mx-2" src={"audio" + soundPane.audio} ui width={18} />
          <input
            className="sliders vSlider"
            onChange={setVolume}
            type="range"
            min="0"
            max="100"
            defaultValue="100"
          />
        </div>
      </div>
    </div>
  );
};