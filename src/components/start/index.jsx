import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Lunar, HolidayUtil } from 'lunar-typescript';
import { Icon } from "../../utils/general";
import { ControlIcon } from "@/components/start/widget.jsx"
import dayjs from "dayjs";
import { Actions } from "@/store"
import "./startmenu.scss";
import "./sidepane.scss";
import "./searchmenu.scss";

export * from "./widget";
export * from "./start";
export * from "./search";
export const DesktopApp = () => {
  const dispatch = useDispatch();
  const clickDispatch = (event) => {
    // event.stopPropagation()
    let actionName = event.currentTarget.dataset.action
    let payload = event.currentTarget.dataset.payload
    let createAction = Actions[actionName]
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
            <div key={i} className="dskApp" tabIndex={0} data-action={app.action} data-payload={app.payload || "full"} onClick={clickDispatch}>
              <Icon
                // click={app.action}
                className="dskIcon prtclk"
                src={app.icon}
                // payload={app.payload || "full"}
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
        {/* <Icon
          className="hvlight"
          width={17}
          click="SPOTIFY"
          payload="togg"
          open="true"
          src="spotify"
        /> */}
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

  useEffect(() => {
    let time = setInterval(() => {
      let date = dayjs()
      let time = date.format("YYYY年MM月DD日")
      const d = Lunar.fromDate(date.toDate());
      const lunarDay = d.getDayInChinese();
      const lunarMonth = d.getMonthInChinese();
      setCurrentDate(`${time} ${lunarMonth}月${lunarDay}`)
      let hourMunite = dayjs().format("HH:mm:ss")
      setCurrentTime(hourMunite)
    }, 1000)
    return () => clearInterval(time)
  }, [])
  return (<div className="time">
    <div className="currentTime">{currentTime}</div>
    <div className="currentDate">{currentDate}</div>
  </div>)
}
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
let getWeekStartMonth = (
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
const disabledDate = (date, anyMonthDate) => {
    const firstDayOfCurrentMonth = anyMonthDate.startOf('month');
    const lastDayOfCurrentMonth = anyMonthDate.endOf('month');
    return date.isAfter(firstDayOfCurrentMonth) && date.isBefore(lastDayOfCurrentMonth);
}
const CalendarData = ({date, selectDate, setSelectDate, viewMonth}) => {
    const today = dayjs()
    const locale = "zh-cn"
    const rows = []
    let baseDate = getWeekStartMonth(locale, date);
    const monthStartDate = setDate(date, 1);
    const startDateWeekDay = getWeekDay(monthStartDate);
    const daysInMonth = date.daysInMonth()
    const rowNum = parseInt((daysInMonth + startDateWeekDay - 1) / 7)
    const colNum = 7
    for (let i = 0; i < rowNum; i += 1) {
        const row = [];
        for (let j = 0; j < colNum; j += 1) {
            const offset = i * colNum + j;
            const currentDate = addDate(baseDate, offset + 1);
            const d = Lunar.fromDate(currentDate.toDate());
            const lunar = d.getDayInChinese();
            const solarTerm = d.getJieQi();
            const h = HolidayUtil.getHoliday(currentDate.get('year'), currentDate.get('month') + 1, currentDate.get('date'));
            const displayHoliday = h?.getTarget() === h?.getDay() ? h?.getName() : undefined;
            const isSelectedDate = isSame(currentDate, selectDate)
            const activeDate = isSame(currentDate, today)
            const activeClass = activeDate ? "fill" : ""
            row.push(<td key={j}>
                <div className="cellBox" onClick={() => {
                    setSelectDate(dayjs(currentDate))
                }}>
                    <div className="today" date-selected={`${isSelectedDate}`}>
                        <div className={activeClass}></div>
                    </div>
                    <div className="cellContainer"
                         style={{color: activeDate ? "rgb(255,255,255)" : !disabledDate(currentDate, viewMonth) ? 'rgba(125,125,125,1)' : ''}}>{getDate(currentDate)}
                        <div className="nl">{displayHoliday || solarTerm || lunar}</div>
                    </div>
                </div>
            </td>)
        }
        rows.push(<tr key={i}>{row}</tr>)
    }
    return (<table className="calendar month-box" data-month={date.format('YYYY-MM')}>
        <tbody>
        {rows}
        </tbody>
    </table>)
}
export const CalendarPane = () => {
    let selectDateInit = dayjs()
    const [selectDate, setSelectDate] = useState(selectDateInit)
    const calendarPane = useSelector((state) => state.calendarPane);
    let calendarBoxRef = useRef();
    let calendarBoxContentRef = useRef();
    let isInitAcitve = useRef(true)
    // 一但到达数据顶部便开始重置滚动距离
    const resetScrollDistance = () => {
        const todayMonth = viewMonth.format('YYYY-MM');
        const calendarBoxContent = calendarBoxContentRef.current
        const currentMonthBox = calendarBoxContent.querySelector(`table.calendar.month-box[data-month="${todayMonth}"]`);
        isInitAcitve.current = false;
        calendarBoxRef.current.scrollTop = currentMonthBox.offsetTop;
    }
    const changeMonth = (count) => {
        // 不想因为页面月份刷新触发视图滚动事件
        isInitAcitve.current = false;
        if (count == -1) {
            const newDateFlag = [dateFlag[0] - 1, ...dateFlag.slice(0, dateFlag.length - 1)]
            setDateFLag(newDateFlag)
            setViewMonthFrom(viewMonth.subtract(1, "month"), 'arrow')
        } else if (count == 1) {
            const newDateFlag = [...dateFlag.slice(1), dateFlag[dateFlag.length - 1] + 1]
            setDateFLag(newDateFlag)
            setViewMonthFrom(viewMonth.add(1, "month"), 'arrow')
        }
    }
    useEffect(() => {
        resetScrollDistance()
    }, [])
    let today = dayjs()
    let [dateFlag, setDateFLag] = useState([-2, -1, 0, 1, 2])
    let [viewMonth, setViewMonth] = useState(dayjs())
    let flashViewMonth = () => {
        const viewCenterLine = calendarBoxRef.current.scrollTop + 264 / 2
        const monthBoxs = document.querySelectorAll(".month-box");
        for (const month of monthBoxs) {
            const offsetTop = month.offsetTop
            if (offsetTop > viewCenterLine) {
                setViewMonthFrom(dayjs(month.dataset.month).subtract(1, "month"), null)
                break;
            }
        }
    }
    const scrollMouse = () => {
        if (!isInitAcitve.current) {
            isInitAcitve.current = true
            return
        }
        // 更新视图框内高亮月显示
        flashViewMonth()
        // 滚动后新增视图月显示
        addViewMonth()
    }
    let sourceRef = useRef(null);
    const setViewMonthFrom = (newValue, origin) => {
        sourceRef.current = origin;
        setViewMonth(newValue);
    };
    useEffect(() => {
        console.log(calendarBoxRef.current.scrollTop, "calendarBoxRef.current.scrollTop")
        if (sourceRef.current == "arrow") {
            resetScrollDistance()
        }
    }, [viewMonth]); // 依赖项是 visible，变化后执行
    const addViewMonth = () => {
        let scrollTop = calendarBoxRef.current.scrollTop
        const calendarBoxContent = calendarBoxContentRef.current
        const currentMonthBoxs = calendarBoxContent.querySelectorAll(`table.calendar.month-box[data-month]`);
        //当滚动到正数第二个的时候就要往前面添加month了
        if (scrollTop < currentMonthBoxs[1].offsetTop) {
            let newDateFlag = [dateFlag[0] - 1, ...dateFlag.slice(0, dateFlag.length - 1)]
            setDateFLag(newDateFlag)
            // 添加后要调整scrollTop
        }
        //当滚动到倒数第二个的时候就要往后面添加month了
        if (scrollTop > currentMonthBoxs[currentMonthBoxs.length - 2].offsetTop) {
            let newDateFlag = [...dateFlag.slice(1), dateFlag[dateFlag.length - 1] + 1]
            setDateFLag(newDateFlag)
        }
    }
    return (
        <div
            className="pane dpShad"
            data-hide={calendarPane.banhide}
            style={{"--prefix": "CAL"}}
        >
            <div className="bandContainer">
                <CalendarTime/>
                <div className="calendarSelectTime">
                    {viewMonth.format('YYYY年MM月')}
                    <div className="arrows">
                        <Icon width={33} src="calendarUpArrow" onClick={() => changeMonth(-1)}></Icon>
                        <Icon width={33} src="calendarDownArrow" onClick={() => changeMonth(1)}></Icon>
                    </div>
                </div>
                <div className="calendarHeader">
                    <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>
                </div>

                <div className="calendarBox" ref={calendarBoxRef} onScroll={scrollMouse}>
                    <div className="calendarBoxContent" ref={calendarBoxContentRef}>
                        {
                            dateFlag.map(num => (
                                <CalendarData key={num} date={today.add(num, "month")} selectDate={selectDate}
                                              viewMonth={viewMonth} setSelectDate={setSelectDate}></CalendarData>
                            ))
                        }
                    </div>
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