import { useEffect, useState, useRef, useDebugValue, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../utils/general";
import Battery from "../shared/Battery";
import { DndProvider, useDrop, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { MOUSELEAVE, MOUSEENTER, ORDERAPP } from "@/store/taskbarSlice"
import "./taskbar.scss";
// let i = 0
const TaskIcon = (props) => {
  const dispatch = useDispatch();
  let { apps, task, isOpen ,showApps} = props
  // let showApps = useSelector((state) => {
  //   return state.taskbar.appOrder;
  // });
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex, "dragIndex,hoverIndex----")
    debugger
    let appOrder = [...showApps]
    let dragObject = appOrder.splice(dragIndex, 1)
    appOrder.splice(hoverIndex, 0, ...dragObject)
    dispatch(ORDERAPP(appOrder))
  }, [])
  // console.log(i++,"全局i")
  // debugger;
  // console.log(task,"task---")
  var isHidden = apps[task.icon].hide;
  var isActive = apps[task.icon].z == apps.hz;
  const ref = useRef(null);
  //先定义一个推拽组件 
  const [{ isDragging, handlerId }, drag] = useDrag(() => ({
    // { isDragging }一个包含从 collect 函数收集的属性的对象。如果没有collect定义函数，则返回一个空对象。
    type: "BOX",//作用:只有为相同类型注册的放置目标才会对此项目做出反应
    item: { icon: task.icon },//必须要有的,相当于id
    /*  end: (item, monitor) => {//end 在被拖拽的组件被放下后执行
       // monitor.getDropResult()返回表示最后记录的放置drop result对象(拖拽元素放下时的结果)
       const dropResult = monitor.getDropResult();//如果dropResult为null，代表拖拽组件没有放到指定区域,有则返回该区域的
       console.log(item, dropResult);
       if (item && dropResult) {//如果拖拽组件结束位置在规定区域则alert
         endFunc(item, dropResult, obj);
       }
     }, */

    //收集器:负责监听收集拖拽组件的状态
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),//是否拖拽状态
    }),
  }));
  const [{ isOver }, drop] = useDrop(() => ({
    //accept:只接受类型为BOX的拖拽组件,否则不能感应
    accept: "BOX",
    hover(item, monitor) {
      console.log(111)
      if (!ref.current) {
        return
      }
      console.log(222)
      const dragIndex = showApps.findIndex(obj => obj.icon == task.icon)
      const hoverIndex = showApps.findIndex(obj => obj.icon == item.icon)
      console.log(hoverIndex,"hoverIndex---")
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        console.log(333)
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientX = clientOffset.x - hoverBoundingRect.left
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        console.log(444)
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        console.log(555)
        return
      }
      console.log(666)
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.icon = showApps[hoverIndex].icon
    }
  }));
  const opacity = isDragging ? 0 : 1
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
}
const Taskbar = () => {
  const tasks = useSelector((state) => {
    return state.taskbar;
  });
  const apps = useSelector((state) => {
    var tmpApps = JSON.parse(JSON.stringify(state.apps));
    for (var i = 0; i < state.taskbar.apps.length; i++) {
      tmpApps[state.taskbar.apps[i].icon].task = true;
    }
    return tmpApps;
  });

  const dispatch = useDispatch();

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

  const hidePrev = () => {
    dispatch({ type: "TASKPHIDE" });
  };

  const clickDispatch = (event) => {
    var action = {
      type: event.target.dataset.action,
      payload: event.target.dataset.payload,
    };

    if (action.type) {
      dispatch(action);
    }
  };
  const onTaskIconEnter = (event) => {
    dispatch(MOUSEENTER());
  }
  const onTaskIconLeave = (event) => {
    dispatch(MOUSELEAVE());
  }

  const [time, setTime] = useState(new Date());
  const isOpen = (task) => {
    if (tasks.apps.find(item => item.icon === task.icon) != -1) {
      return apps[task.icon].hide ? null : true;
    }
    return "open"
  }
  useEffect(() => {
    // dispatch(ORDERAPP(showApps))
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="taskbar">
      <div className="taskcont">
        <div className="tasksCont" data-menu="task">
          <div className="tsbar" onMouseOut={hidePrev}>
            {tasks.winStart ? (
              <Icon
                icon="winStart"
                height="16"
                width="16"
                className={`tsIcon win-start-icon`}
              />
            ) : null}
            {/* <Icon className="tsIcon" src="home" width={24} click="STARTOGG" /> */}

            <div className="win-search" >
              <Icon
                className="tsIcon win-search-icon"
                icon="winSearch"
                height="20"
                width="20"
              />
              <input placeholder="搜索"></input>
            </div>
            <div className="win-task" onClick={onTaskIconEnter} onMouseOver={onTaskIconEnter} onMouseOut={onTaskIconLeave}>
              {tasks.taskIconMoveEnter ? <Icon
                className={`tsIcon win-task-icon-hover`}
                src="taskhover"
                margin=""
                width="18"
              /> : <Icon
                className={`tsIcon win-task-icon-nohover`}
                src="task"
                margin=""
                width="23"
              />}
            </div>
            <div className="fix-icon">
              <DndProvider backend={HTML5Backend}>
                {tasks.appOrder.map((task, i) => (<TaskIcon key={task.icon} apps={apps} task={task} isOpen={isOpen} showApps={tasks.appOrder}></TaskIcon>)
                )}
              </DndProvider>
            </div>
          </div>
        </div>
        <div className="taskright">
          <div
            className="px-2 prtclk handcr hvlight flex"
            onClick={clickDispatch}
            data-action="BANDTOGG"
          >
            <Icon fafa="faChevronUp" width={10} />
          </div>
          <div
            className="prtclk handcr my-1 px-1 hvlight flex rounded"
            onClick={clickDispatch}
            data-action="PANETOGG"
          >
            <Icon className="taskIcon" src="wifi" ui width={16} />
            <Icon
              className="taskIcon"
              src={"audio" + tasks.audio}
              ui
              width={16}
            />
            <Battery />
          </div>

          <div
            className="taskDate m-1 handcr prtclk rounded hvlight"
            onClick={clickDispatch}
            data-action="CALNTOGG"
          >
            <div>
              {time.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
            <div>
              {time.toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "numeric",
              })}
            </div>
          </div>
          <Icon className="graybd my-4" ui width={6} click="SHOWDSK" pr />
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
