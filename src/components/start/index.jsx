import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Lunar, HolidayUtil } from 'lunar-typescript';
import { Icon } from "../../utils/general";
import { ControlIcon } from "@/components/start/widget.jsx"
import { Actions } from "@/store"
import dayjs from "dayjs";
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
      <div className="bandpaneContainer">
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
export const CalendarPane = () => {
  const calendarPane = useSelector((state) => state.calendarPane);
  debugger
  let rowNum = 6
  let colNum = 7
  let locale = "zh-cn"
  let viewDate = dayjs()
  let rows = []
  let addDate = (date, diff) => date.add(diff, 'day')
  let getWeekFirstDay = (locale) => {
    let t = dayjs().locale(locale)
    return t.localeData().firstDayOfWeek()
  }
  let setDate = (date, num) => date.date(num)
  let getWeekDay = (date) => {
    const clone = date.locale('en');
    return clone.weekday() + clone.localeData().firstDayOfWeek();
  }
  let getMonth = (date) => date.month()
  let getDate = (date) => date.date()
  let getWeekStartDate = (
    locale,
    value
  ) => {
    const weekFirstDay = getWeekFirstDay(locale);
    const monthStartDate = setDate(value, 1);
    const startDateWeekDay = getWeekDay(monthStartDate);
    let alignStartDate = addDate(monthStartDate, weekFirstDay - startDateWeekDay);
    if (
      getMonth(alignStartDate) === getMonth(value) &&
      getDate(alignStartDate) > 1
    ) {
      alignStartDate = addDate(alignStartDate, -7);
    }

    return alignStartDate;
  }
  const disabledDate = (date) => {
    const currentDate = dayjs();
    const firstDayOfCurrentMonth = currentDate.startOf('month');
    const lastDayOfCurrentMonth = currentDate.endOf('month');

    return date.isAfter(firstDayOfCurrentMonth) && date.isBefore(lastDayOfCurrentMonth);
  }
  for (let i = 0; i < rowNum; i += 1) {
    const row = [];
    for (let j = 0; j < colNum; j += 1) {
      const offset = i * colNum + j;
      const baseDate = getWeekStartDate(locale, viewDate);
      const currentDate = addDate(baseDate, offset + 1);
      const disabled = disabledDate(currentDate)
      const d = Lunar.fromDate(currentDate.toDate());
      const lunar = d.getDayInChinese();
      const solarTerm = d.getJieQi();
      const h = HolidayUtil.getHoliday(currentDate.get('year'), currentDate.get('month') + 1, currentDate.get('date'));
      const displayHoliday = h?.getTarget() === h?.getDay() ? h?.getName() : undefined;
      row.push(<td><div class="cellBox"><div class="cellContainer" style={{ color: !disabled ? 'rgba(125,125,125,1)' : '' }}>{getDate(currentDate)}<div class="nl">{displayHoliday || solarTerm || lunar}</div></div></div></td>)
    }
    rows.push(<tr>{row}</tr>)
  };
  return (
    <div
      className="pane dpShad"
      data-hide={calendarPane.banhide}
      style={{ "--prefix": "CAL" }}
    >
      <div className="bandContainer">
        <div>{calendarPane.currentMouth}</div>
        <table class="calendar">
          <thead><tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr></thead>
          <tbody>
            {/* <tr>
              <td><div class="cellBox"><div class="cellContainer">30<div class="nl">十六</div></div></div></td>
              <td><div class="cellBox"><div class="cellContainer">31<div class="nl">十七</div></div></div></td>
              <td><div class="cellBox"><div class="cellContainer">1<div class="nl">十八</div></div></div></td>
              <td><div class="cellBox"><div class="cellContainer">2<div class="nl">十九</div></div></div></td>
              <td><div class="cellBox"><div class="cellContainer">3<div class="nl">二十</div></div></div></td>
              <td><div class="cellBox"><div class="cellContainer">4<div class="nl">廿一</div></div></div></td>
              <td><div class="cellBox"><div class="cellContainer">5<div class="nl">廿二</div></div></div></td>
            </tr> */}
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export const SoundPane = () => {
  const vSlider = document.querySelector(".vSlider");
  const dispatch = useDispatch();
  function sliderBackground(elem, e) {
    elem.style.setProperty(
      "--track-color",
      `linear-gradient(90deg, var(--clrPrm) ${e - 3}%, #888888 ${e}%)`,
    );
  }
  const setVolume = (e) => {
    var aud = 3;
    if (e.target.value < 70) aud = 2;
    if (e.target.value < 30) aud = 1;
    if (e.target.value == 0) aud = 0;
    dispatch(Actions['TASKAUDO'](aud));
    dispatch(Actions['SOUNDVALUE'](e.target.value));
    sliderBackground(vSlider, e.target.value);

  };
  const soundPane = useSelector((state) => state.soundPane);
  return (
    <div
      className="pane dpShad"
      data-hide={soundPane.banhide}
      style={{ "--prefix": "SOUND" }}
    >
      <div className="bandContainer">
        <div className="soundText">
          {`扬声器 (High Definition Audio Device)`}
        </div>
        <div className="sliderCont">
          <Icon className="soundIcon" src={"audio" + soundPane.audio} ui width={38} />
          <input
            className="sliders vSlider"
            onChange={setVolume}
            type="range"
            min="0"
            max="100"
            defaultValue="100"
          />
          <span className="soundValue">
            {soundPane.value}
          </span>
        </div>
      </div>
    </div>
  );
};