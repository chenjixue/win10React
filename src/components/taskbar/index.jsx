import { useEffect, useState, useRef, useDebugValue, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../utils/general";
import { DndProvider, useDrop, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MOUSELEAVE, MOUSEENTER, ORDERAPP } from "@/store/taskbarSlice";
import { Actions } from "@/store";
import "./taskbar.scss";
import { prefix } from "@fortawesome/free-solid-svg-icons";
const TaskIcon = (props) => {
  const dispatch = useDispatch();
  let { apps, task, isOpen } = props;
  let showApps = useSelector((state) => {
    return JSON.parse(JSON.stringify(state.apps.appOrder));
  });
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      let appOrder = [...showApps];
      console.log("🚀 ~ moveCard ~ dragIndex:", dragIndex);
      console.log("🚀 ~ moveCard ~ hoverIndex:", hoverIndex);
      console.log(
        "🚀 ~ moveCard ~ appOrder0:",
        JSON.parse(JSON.stringify(appOrder))
      );
      let dragObject = appOrder.splice(dragIndex, 1);
      console.log("🚀 ~ moveCard ~ dragObject:", dragObject);
      console.log(
        "🚀 ~ moveCard ~ appOrder1:",
        JSON.parse(JSON.stringify(appOrder))
      );
      appOrder.splice(hoverIndex, 0, ...dragObject);
      // let appOrder = [...taskApps, ...appObjects]
      console.log(
        "🚀 ~ moveCard ~ appOrder2:",
        JSON.parse(JSON.stringify(appOrder))
      );
      dispatch({
        type: "ORDERAPP",
        payload: appOrder,
      });
    },
    [showApps]
  );
  let isHidden = apps[task.icon].hide;
  let isActive = apps[task.icon].z == apps.hz;
  const ref = useRef(null);
  //先定义一个推拽组件
  const [{ isDragging, handlerId }, drag] = useDrag(() => ({
    type: "BOX", //作用:只有为相同类型注册的放置目标才会对此项目做出反应
    item: { icon: task.icon }, //必须要有的,相当于id
    //收集器:负责监听收集拖拽组件的状态
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), //是否拖拽状态
    }),
  }));
  let hover = (item, monitor) => {
    if (!ref.current) {
      return;
    }
    const dragIndex = showApps.findIndex((obj) => obj.icon == item.icon);
    const hoverIndex = showApps.findIndex((obj) => obj.icon == task.icon);
    // Determine rectangle on screen
    const hoverBoundingRect = ref.current?.getBoundingClientRect();
    // Get vertical middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }
    // if(showApps[hoverIndex] === undefined){
    //   debugger
    // }
    // Time to actually perform the action
    moveCard(dragIndex, hoverIndex);
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    item.icon = showApps[hoverIndex].icon;
  };
  const [{ isOver }, drop] = useDrop(() => {
    console.log("重新生成--");
    return {
      //accept:只接受类型为BOX的拖拽组件,否则不能感应
      accept: "BOX",
      hover,
    };
  }, [showApps]);
  const opacity = isDragging ? 0 : 1;
  const showPrev = (event) => {
    var ele = event.target;
    while (ele && ele.getAttribute("value") == null) {
      ele = ele.parentElement;
    }

    var appPrev = ele.getAttribute("value");
    var xpos = window.scrollX + ele.getBoundingClientRect().left;

    var offsetx = Math.round((xpos * 10000) / window.innerWidth) / 100;

    dispatch({
      type: "TASKPSHOW",
      payload: {
        app: appPrev,
        pos: offsetx,
      },
    });
  };
  return (
    <div
      key={task.icon}
      ref={drop(drag(ref))}
      style={{ opacity }}
      onMouseOver={(!isActive && !isHidden && showPrev) || null}
      value={task.icon}
    >
      <Icon
        className="tsIcon"
        width={24}
        open={isOpen(task)}
        click={task.action}
        active={isActive}
        payload="togg"
        src={task.icon}
      />
    </div>
  );
};
let TaskTime = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(new Date());
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);
  const clickDispatch = (event) => {
    let type = event.currentTarget.dataset.action;
    let payload = event.currentTarget.dataset.payload;
    if (type) {
      dispatch(Actions[type](payload));
    }
  };
  useEffect(() => {
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className="taskDate handcr prtclk rounded hvlight"
      onClick={clickDispatch}
      data-action="CALENDARTOGG"
    >
      <div style={{ "--prefix": "CAL" }}>
        {time.toLocaleTimeString("zh-CN", {
          hour: "numeric",
          minute: "numeric",
        })}
      </div>
      <div style={{ "--prefix": "CAL" }}>
        {time
          .toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//g, "/")}
      </div>
    </div>
  );
};
const Taskbar = () => {
  const tasks = useSelector((state) => {
    return state.taskbar;
  });
  const widpane = useSelector((state) => {
    return state.widpane;
  });
  const languagePane = useSelector((state) => {
    return state.languagePane;
  });
  const apps = useSelector((state) => {
    var tmpApps = JSON.parse(JSON.stringify(state.apps));
    for (var i = 0; i < state.taskbar.apps.length; i++) {
      tmpApps[state.taskbar.apps[i].icon].task = true;
    }
    return tmpApps;
  });
  // let getAppOrder = () => {
  //     let temApps = isInit ? appSlice.getInitialState() : store.getState().apps
  //     let isShowApp = key => {
  //         return key != "hz" && key != "undefined" && !temApps[key].task && !temApps[key].hide
  //     }
  //     let appObjects = Object.keys(temApps).filter(isShowApp).map(key => temApps[key])
  //     let appOrder = [...taskApps, ...appObjects]
  //     return appOrder
  // }
  const appOrder = useSelector((state) => {
    return JSON.parse(JSON.stringify(state.apps.appOrder));
  });
  const soundPane = useSelector((state) => {
    return state.soundPane;
  });
  const dispatch = useDispatch();

  const hidePrev = () => {
    dispatch({ type: "TASKPHIDE" });
  };

  const clickDispatch = (event) => {
    let type = event.currentTarget.dataset.action;
    let payload = event.currentTarget.dataset.payload;
    if (type) {
      dispatch(Actions[type](payload));
    }
  };
  const onTaskIconEnter = (event) => {
    dispatch(MOUSEENTER());
  };
  const onTaskIconLeave = (event) => {
    dispatch(MOUSELEAVE());
  };

  const isOpen = (task) => {
    if (tasks.apps.find((item) => item.icon === task.icon) != -1) {
      return apps[task.icon].hide ? null : true;
    }
    return "open";
  };
  const inputFocus = () => {
    dispatch(Actions.SEARCHSHOW());
  };
  useEffect(() => {
    let t =
      "https://api.msn.cn/weatherfalcon/weather/current?apikey=j5i4gDqHL6nGYwx5wi5kRhXjtf2c5qgFX9fzfk0TOo&activityId=742F8161-9837-4912-B5AC-B9C5F78696AA&ocid=msftweather&cm=zh-cn&it=edgeid&user=m-1398AA8B55406700058CB854549266CB&latLongList=41.2678733668769%2C123.23673248291%7C41.1083490928298%2C122.994346618652%7C41.6772825105281%2C123.46435546875%7C41.8810168743561%2C123.957023620605%7C42.2861994372228%2C123.842353820801%7C40.7196174412421%2C122.170715332031%7C40.0188387048721%2C124.315452575684%7C42.0217639812188%2C121.670150756836%7C41.095766117327%2C121.126670837402%7C43.1663169082502%2C124.350471496582%7C40.7108279939588%2C120.836906433105%7C42.8882676054473%2C125.143890380859%7C43.654234136767%2C122.243156433105%7C41.7281902342658%2C125.940055847168%7C41.6017125077067%2C120.488433837891&locale=zh-cn&units=C&appId=9e21380c-ff19-4c78-b4ea-19558e93a5d3&wrapOData=false&includenowcasting=true&usemscloudcover=true&getCmaAlert=true";
    fetch(t)
      .then((response) => response.json())
      .then(({ responses }) => {
        let param = {
          temp: responses[0].weather[0].current.temp,
          weatherImg: responses[0].weather[0].current.urlIcon,
          capAbbr: responses[0].weather[0].current.capAbbr,
        };
        dispatch(Actions.WINSETTING(param));
      });
  }, []);
  return (
    <div className="taskbar">
      <div className="taskcont">
        <div className="tasksCont" data-menu="task">
          {tasks.winStart ? (
            <Icon
              icon="winStart"
              click="STARTOGG"
              width={16}
              className={`tsIcon win-start-icon`}
            />
          ) : null}
          <div className="win-search">
            <Icon
              className="tsIcon win-search-icon"
              click="SEARCHSHOW"
              icon="winSearch"
              width={20}
            />
            <input
              style={{ "--prefix": "SEARCH" }}
              placeholder="搜索"
              onChange={(event) => {
                const action = Actions.SEARCHCHAGE(event.target.value.trim())
                dispatch(action)
              }}
              onFocus={inputFocus}
            ></input>
          </div>
          <div
            className="win-task"
            onClick={onTaskIconEnter}
            onMouseOver={onTaskIconEnter}
            onMouseOut={onTaskIconLeave}
          >
            {tasks.taskIconMoveEnter ? (
              <Icon
                className="tsIcon win-task-icon-hover"
                src="taskhover"
                width={18}
              />
            ) : (
              <Icon
                className="tsIcon win-task-icon-nohover"
                src="task"
                width={23}
              />
            )}
          </div>
          <div className="fix-icon">
            <DndProvider backend={HTML5Backend}>
              {appOrder.map((task, i) => (
                <TaskIcon
                  key={task.icon}
                  apps={apps}
                  task={task}
                  isOpen={isOpen}
                  showApps={appOrder}
                ></TaskIcon>
              ))}
            </DndProvider>
          </div>
          <div className="win-task-tem"></div>
          <div className="taskright">
            <div className="weather">
              <Icon src={widpane.data.weatherImg} width={26} />
              <span style={{ paddingLeft: "10px" }}>{widpane.data.temp}°C</span>
              <span
                style={{
                  marginLeft: "10px",
                }}
              >
                {" "}
                {widpane.data.capAbbr}
              </span>
            </div>
            <Icon src="upArrow" width={24} click="BANDTOGG" />
            <Icon
              className="taskIcon"
              src="wifi"
              click="NETWORKTOGG"
              ui
              width={24}
            />
            <Icon
              className="taskIcon"
              click="SOUNDTOGG"
              src={"audio" + soundPane.audio}
              ui
              width={24}
            />
            <div
              className="language"
              onClick={clickDispatch}
              data-action="LANGUAGETOGG"
              data-payload={languagePane.language == 1 ? 2 : 1}
            >
              {languagePane.language == 1 ? "中" : "英"}
            </div>
            {/* <Battery /> */}

            <TaskTime />
            <Icon src={`tipInfor`} width={49} click="WIDGTOGG" />
            <Icon className="graybd" ui width={4} click="SHOWDSK" pr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
