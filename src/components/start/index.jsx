import React, { useCallback, useEffect, useRef, useState } from "react";
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
export const CalendarTime = () => {
  let [currentDate, setCurrentDate] = useState("")
  let [currentTime, setCurrentTime] = useState("")
  setInterval(() => {
    let date = dayjs()
    let time = date.format("YYYY年MM月DD日")
    const d = Lunar.fromDate(date.toDate());
    const lunarDay = d.getDayInChinese();
    const lunarMonth = d.getMonthInChinese();
    setCurrentDate(`${time} ${lunarMonth}月${lunarDay}`)
    let hourMunite = dayjs().format("HH:mm:ss")
    setCurrentTime(hourMunite)
  }, 1000)
  return (<div className="time">
    <div className="currentTime">{currentTime}</div>
    <div className="currentDate">{currentDate}</div>
  </div>)
}
export const CalendarMonthPane = () => {
  let viewDateInit = dayjs()
  let rowNumInit = 7
  const [viewDate, setViewDate] = useState(viewDateInit)
  const [rowNum, setRowNum] = useState(rowNumInit)
  const calendarPane = useSelector((state) => state.calendarPane);

  let calendarRef = useRef();
  let calendarBoxRef = useRef();
  let scrollDataBoxRef = useRef();
  let calendarScrollDistanceRef = useRef(600);
  useEffect(() => {
    // 每次视图更新让虚拟滚动的滚条归零
    if (scrollDataBoxRef.current) {
      scrollDataBoxRef.current.scrollTop = 600
      calendarScrollDistanceRef.current = 600
      scrollDataBoxRef.current.style.setProperty("pointer-events", "none")
    }
  }, [viewDate]);
  let colNum = 7
  let locale = "zh-cn"

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
      getMonth(alignStartDate) === getMonth(value)
    ) {
      alignStartDate = addDate(alignStartDate, -7);
    }

    return alignStartDate;
  }
  let oneDayBefore = 0
  let oneDayAfter = 0
  let baseDate, monthStartDate
  const disabledDate = (date) => {
    if (oneDayBefore > oneDayAfter) {
      monthStartDate.subtract(1, "month")
    }
    const firstDayOfCurrentMonth = monthStartDate.startOf('month');
    const lastDayOfCurrentMonth = monthStartDate.endOf('month');
    return date.isAfter(firstDayOfCurrentMonth) && date.isBefore(lastDayOfCurrentMonth);
  }
  for (let i = 0; i < rowNum; i += 1) {
    const row = [];
    for (let j = 0; j < colNum; j += 1) {
      const offset = i * colNum + j;
      baseDate = getWeekStartDate(locale, viewDate);
      monthStartDate = setDate(viewDate, 1);
      const currentDate = addDate(baseDate, offset + 1);
      if (currentDate.isBefore(monthStartDate)) {
        oneDayBefore++
      } else {
        oneDayAfter++
      }
      const d = Lunar.fromDate(currentDate.toDate());
      const lunar = d.getDayInChinese();
      const solarTerm = d.getJieQi();
      const h = HolidayUtil.getHoliday(currentDate.get('year'), currentDate.get('month') + 1, currentDate.get('date'));
      const displayHoliday = h?.getTarget() === h?.getDay() ? h?.getName() : undefined;
      row.push(<td key={j}><div className="cellBox"><div className="cellContainer" style={{ color: !disabledDate(currentDate) ? 'rgba(125,125,125,1)' : '' }}>{getDate(currentDate)}<div className="nl">{displayHoliday || solarTerm || lunar}</div></div></div></td>)
    }
    rows.push(<tr key={i}>{row}</tr>)
  };
}
export const CalendarPane = () => {
  let today = dayjs()
  let viewDateInit = dayjs()
  let selectDateInit = dayjs()
  let rowNumInit = 7
  const [viewDate, setViewDate] = useState(viewDateInit)
  const [selectDate, setSelectDate] = useState(selectDateInit)
  const [rowNum, setRowNum] = useState(rowNumInit)
  const calendarPane = useSelector((state) => state.calendarPane);

  let calendarRef = useRef();
  let calendarBoxRef = useRef();
  let scrollDataBoxRef = useRef();
  let calendarScrollDistanceRef = useRef(600);
  useEffect(() => {
    // 每次视图更新让虚拟滚动的滚条归零
    if (scrollDataBoxRef.current) {
      scrollDataBoxRef.current.scrollTop = 600
      calendarScrollDistanceRef.current = 600
    }
  }, [viewDate]);
  let colNum = 7
  let locale = "zh-cn"

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
  let isSame = (date1, date2) => date1.format("YYYYMMDD") === date2.format("YYYYMMDD")
  let getWeekStartDate = (
    locale,
    value
  ) => {
    const weekFirstDay = getWeekFirstDay(locale);
    const monthStartDate = setDate(value, 1);
    const startDateWeekDay = getWeekDay(monthStartDate);
    let alignStartDate = addDate(monthStartDate, weekFirstDay - startDateWeekDay);
    if (
      getMonth(alignStartDate) === getMonth(value)
    ) {
      alignStartDate = addDate(alignStartDate, -7);
    }

    return alignStartDate;
  }
  let oneDayBefore = 0
  let oneDayAfter = 0
  let baseDate, monthStartDate
  const disabledDate = (date) => {
    if (oneDayBefore > oneDayAfter) {
      monthStartDate.subtract(1, "month")
    }
    const firstDayOfCurrentMonth = monthStartDate.startOf('month');
    const lastDayOfCurrentMonth = monthStartDate.endOf('month');
    return date.isAfter(firstDayOfCurrentMonth) && date.isBefore(lastDayOfCurrentMonth);
  }
  for (let i = 0; i < rowNum; i += 1) {
    const row = [];
    for (let j = 0; j < colNum; j += 1) {
      const offset = i * colNum + j;
      baseDate = getWeekStartDate(locale, viewDate);
      monthStartDate = setDate(viewDate, 1);
      const currentDate = addDate(baseDate, offset + 1);
      if (currentDate.isBefore(monthStartDate)) {
        oneDayBefore++
      } else {
        oneDayAfter++
      }
      const d = Lunar.fromDate(currentDate.toDate());
      const lunar = d.getDayInChinese();
      const solarTerm = d.getJieQi();
      const h = HolidayUtil.getHoliday(currentDate.get('year'), currentDate.get('month') + 1, currentDate.get('date'));
      const displayHoliday = h?.getTarget() === h?.getDay() ? h?.getName() : undefined;
      const isSelectedDate = isSame(currentDate, selectDate)
      const activeDate = isSame(currentDate, today)
      const activeClass = activeDate ? "fill" : ""
      row.push(<td key={j}><div className="cellBox" onClick={() => { setSelectDate(dayjs(currentDate)) }}><div className="today" date-selected={`${isSelectedDate}`}> <div className={activeClass}></div> </div><div className="cellContainer" style={{ color:activeDate ? "rgb(255,255,255)" : !disabledDate(currentDate) ? 'rgba(125,125,125,1)' : '' }}>{getDate(currentDate)}<div className="nl">{displayHoliday || solarTerm || lunar}</div></div></div></td>)
    }
    rows.push(<tr key={i}>{row}</tr>)
  };
  const changeMonth = (count) => {
    setViewDate(monthStartDate.add(count, "month"))
    calendarBoxRef.current.scrollTop = 0;
  }
  const scrollMouse = () => {
    //关闭模拟滚动的遮罩点击穿透样式让滚动重新回到遮罩上
    scrollDataBoxRef.current.style.setProperty("pointer-events", "auto")
  }
  const scrollContent = (e) => {
    if (scrollDataBoxRef.current.scrollTop == calendarScrollDistanceRef.current) {
      return
    }
    let distance = (e.target.scrollTop - calendarScrollDistanceRef.current) % 34
    let scrollNum = parseInt((e.target.scrollTop - calendarScrollDistanceRef.current) / 34)
    setViewDate(viewDate.add(scrollNum * 7, 'day'))
    calendarScrollDistanceRef.current = e.target.scrollTop
    calendarBoxRef.current.scrollTop = distance
    scrollDataBoxRef.current.style.setProperty("pointer-events", "none")
  }
  return (
    <div
      className="pane dpShad"
      data-hide={calendarPane.banhide}
      style={{ "--prefix": "CAL" }}
    >
      <div className="scrollDataBox" ref={scrollDataBoxRef} onScroll={scrollContent}>
        <div className="scrollContent" >
        </div>
      </div>
      <div className="bandContainer">
        <CalendarTime />
        <div className="calendarSelectTime">{monthStartDate.format('YYYY年MM月')}
          <div className="arrows">
            <Icon width={33} src="calendarUpArrow" onClick={() => changeMonth(-1)}></Icon>
            <Icon width={33} src="calendarDownArrow" onClick={() => changeMonth(1)}></Icon>
          </div>
        </div>
        <div className="calendarHeader"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>
        <div className="calendarBox" ref={calendarBoxRef} onWheel={scrollMouse}>
          <table className="calendar" ref={calendarRef} >
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
        <div className="operationText">
          日期和时间设置
        </div>
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