import { useState } from 'react'
import { ErrorBoundary } from "react-error-boundary";
import { Background, BootScreen, LockScreen } from "./containers/background";
import { useDispatch, useSelector } from "react-redux";
import Taskbar from "./components/taskbar";
import * as Drafts from "./containers/applications/draft";
import "./index.css";
import {
  WidPane,
  BandPane,
  NetWorkPane,
  DesktopApp,
  SoundPane,
  CalendarPane,
  StartMenu,
  SearchMenu
} from "./components/start";
import { Actions } from "@/store"
import * as Applications from "./containers/applications";
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <meta charSet="UTF-8" />
      <title>404 - Page</title>
      <script src="/js/notFound.js"></script>
      <link rel="stylesheet" href="/css/notFound.css" />
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
              </div>
            </div>
            <div id="stopcode">
              <h4>
                For more information about this issue and possible fixes, visit
                <br />{" "}
                <a href="https://github.com/chenjixue/win10React/issues">
                  https://github.com/chenjixue/win10React/issues
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
  const wall = useSelector((state) => state.wallpaper);
  const dispatch = useDispatch();
  const afterMath = (event) => {
    var ess = [
      ["BAND", "BANDHIDE"],
      ["NETWORK", "NETWORKHIDE"],
      ["SOUND", "SOUNDHIDE"],
      // ["PANE", "PANEHIDE"],
      ["WIDG", "WIDGHIDE"],
      ["CAL", "CALENDARHIDE"],
      ["START", "STARTHIDE"],
      ["SEARCH", "SEARCHHIDE"],
      // ["CALN", "CALNHIDE"],
      // ["MENU", "MENUHIDE"],
    ];
    var actionType = "";
    try {
      actionType = event.target.dataset.action || "";
    } catch (err) { }

    var actionType0 = getComputedStyle(event.target).getPropertyValue(
      "--prefix",
    );
    ess.forEach((item, i) => {
      if (!actionType.startsWith(item[0]) && !actionType0.startsWith(item[0])) {
        item[1] && dispatch(Actions[item[1]]())
      }
    });
  };
  window.onclick = afterMath;
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {/* {!wall.booted ? <BootScreen dir={wall.dir} /> : null} */}
        {wall.locked ? <LockScreen dir={wall.dir} /> : null}
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
              .filter((x) => x != "hz" && x != "appOrder")
              .map((key) => apps[key])
              .map((app, i) => {
                if (app.pwa) {
                  var WinApp = Drafts[app.data.type];
                  return <WinApp key={i} icon={app.icon} {...app.data} />;
                }
              })}
            <StartMenu />
            <SearchMenu />
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
