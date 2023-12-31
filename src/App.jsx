import { useState } from 'react'
import { ErrorBoundary } from "react-error-boundary";
import { Background } from "./containers/background";
import { useDispatch, useSelector } from "react-redux";
import Taskbar from "./components/taskbar";
import * as Applications from "./containers/applications";
import * as Drafts from "./containers/applications/draft";
import "./index.css";
import {
  WidPane,
  BandPane,
  NetWorkPane,
  DesktopApp,
  SoundPane,
  CalendarPane,
  StartMenu
} from "./components/start";
import { Actions } from "@/store"
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <meta charSet="UTF-8" />
      <title>404 - Page</title>
      <script src="https://win11.blueedge.me/script.js"></script>
      <link rel="stylesheet" href="https://win11.blueedge.me/style.css" />
      {/* partial:index.partial.html */}
      <div id="page">
        <div id="container">
          <h1>:(</h1>
          <h2>
            Your PC ran into a problem and needs to restart. We're just
            collecting some error info, and then we'll restart for you.
          </h2>
          <h2>
            <span id="percentage">0</span>% complete
          </h2>
          <div id="details">
            <div id="qr">
              <div id="image">
                <img src="https://win11.blueedge.me/img/qr.png" alt="QR Code" />
              </div>
            </div>
            <div id="stopcode">
              <h4>
                For more information about this issue and possible fixes, visit
                <br />{" "}
                <a href="https://github.com/blueedgetechno/win11React/issues">
                  https://github.com/blueedgetechno/win11React/issues
                </a>{" "}
              </h4>
              <h5>
                If you call a support person, give them this info:
                <br />
                Stop Code: {error.message}
              </h5>
              <button onClick={resetErrorBoundary}>Try again</button>
            </div>
          </div>
        </div>
      </div>
      {/* partial */}
    </div>
  );
}
function App() {
  const apps = useSelector((state) => state.apps);
  const dispatch = useDispatch();
  const afterMath = (event) => {
    console.log("")
    var ess = [
      ["BAND", "BANDHIDE"],
      ["NETWORK", "NETWORKHIDE"],
      ["SOUND", "SOUNDHIDE"],
      // ["PANE", "PANEHIDE"],
      ["WIDG", "WIDGHIDE"],
      ["CAL", "CALENDARHIDE"],
      ["START", "STARTHIDE"],
      // ["CALN", "CALNHIDE"],
      // ["MENU", "MENUHIDE"],
    ];
    var actionType = "";
    try {
      actionType = event.target.dataset.action || "";
      console.log("actionType---", actionType)
    } catch (err) { }

    var actionType0 = getComputedStyle(event.target).getPropertyValue(
      "--prefix",
    );
    debugger
    console.log(actionType,actionType0,"actionType0----")
    ess.forEach((item, i) => {
      if (!actionType.startsWith(item[0]) && !actionType0.startsWith(item[0])) {
        console.log(actionType,actionType0,"actionType0----")
        item[1] && dispatch(Actions[item[1]]())
      }
    });
  };
  window.onclick = afterMath;
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        { }
        <div className="appwrap">
          <Background />
          <div className="desktop" data-menu="desk">
            <DesktopApp />
            {Object.keys(Applications).map((key, idx) => {
              var WinApp = Applications[key];
              return <WinApp key={idx} />;
            })}
            {/* {Object.keys(Applications).map((key, idx) => {
              var WinApp = Applications[key];
              return <WinApp key={idx} />;
            })} */}
            {Object.keys(apps)
              .filter((x) => x != "hz")
              .map((key) => apps[key])
              .map((app, i) => {
                if (app.pwa) {
                  var WinApp = Drafts[app.data.type];
                  return <WinApp key={i} icon={app.icon} {...app.data} />;
                }
              })}
            <StartMenu />
            <WidPane />
            <BandPane />
            <NetWorkPane />
            <SoundPane />
            <CalendarPane />
            {/* <CalnWid /> */}
            {/* <SidePane /> */}
          </div>
          <Taskbar />
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default App
