import { useEffect, useState, useRef, useDebugValue, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Icon } from "../../utils/general";
import { DndProvider, useDrop, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MOUSELEAVE, MOUSEENTER, ORDERAPP } from "@/store/taskbarSlice";
import { Actions } from "@/store";
import "./taskbar.scss";
import { prefix } from "@fortawesome/free-solid-svg-icons";
const TaskIcon = (props) => {
  const dispatch = useDispatch();
  let { apps, task, isOpen, index } = props;
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
  let isHidden = apps[task.icon].hide;
  let isActive = apps[task.icon].z == apps.hz;
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
    <Draggable key={task.icon} draggableId={task.icon} index={index}>
      {(provided, snapshot) => {
        const style = {
          ...provided.draggableProps.style,
          cursor: "auto",
          top: "0px",
        };
        return <div
          ref={provided.innerRef}
          onMouseOver={(!isActive && !isHidden && showPrev) || null}
          data-payload="togg"
          value={task.icon}
          className="iconBox"
          data-action={task.action}
          onClick={clickDispatch}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={style}
        >
          <Icon
            className="tsIcon"
            width={24}
            open={isOpen(task)}
            // click={task.action}
            active={isActive}
            // payload="togg"
            src={task.icon}
          />
        </div>
      }}
    </Draggable>
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
  const query = useSelector(state => {
    return state.searchmenu.query
  })
  const apps = useSelector((state) => {
    var tmpApps = JSON.parse(JSON.stringify(state.apps));
    for (var i = 0; i < state.taskbar.apps.length; i++) {
      tmpApps[state.taskbar.apps[i].icon].task = true;
    }
    return tmpApps;
  });
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
  const onDragEnd = useCallback(
    ({ destination, source }) => {
      if (!destination) {
        return;
      }
      let newAppOrder = [...appOrder];
      let dragObject = newAppOrder.splice(source.index, 1);
      newAppOrder.splice(destination.index, 0, ...dragObject);
      // let newAppOrder = [...taskApps, ...appObjects]
      dispatch({
        type: "ORDERAPP",
        payload: newAppOrder,
      });
    },
    [appOrder]
  );
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
              value={query}
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
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    // className="dropBox"
                    style={{ display: "flex", height: "100%" }}
                  >
                    {appOrder.map((task, index) => (
                      <TaskIcon
                        key={task.icon}
                        apps={apps}
                        task={task}
                        index={index}
                        isOpen={isOpen}
                        showApps={appOrder}
                      ></TaskIcon>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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
