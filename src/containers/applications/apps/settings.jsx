import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { changeTheme } from "../../../actions";
import { Image, ToolBar } from "../../../utils/general";
// import LangSwitch from "./assets/Langswitch";
import "./assets/settings.scss";
// import data from "./assets/settingsData.json";

export const Settings = () => {
  const wnapp = useSelector((state) => state.apps.settings);
  return (
    <div
      className="settingsApp floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="Settings"
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow flex-grow flex flex-col">
      

       


        
        </div>
      </div>
    </div>
  );
};
