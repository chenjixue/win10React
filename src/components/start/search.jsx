import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@/utils/general";
import { Actions } from "@/store";
import Styles from "./searchmenu.module.scss"
const PnApp = ({ icon, iconSize = 30, payload, action, name }) => {
  const dispatch = useDispatch();
  const clickDispatch = (event) => {
    // event.stopPropagation()
    let actionName = event.currentTarget.dataset.action
    let createAction = Actions[actionName]
    let payload = event.currentTarget.dataset.payload
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
  return (
    <div className={Styles.app} style={{ "--prefix": "no" }} data-payload={payload} data-action={action} onClick={clickDispatch}>
      <div className={Styles.iconBox}>
        <Icon src={icon} width={iconSize} ></Icon>
      </div>
      <div className={Styles.name}>{name}</div>
    </div>
  )
}
const AppItem = ({ app }) => {
  return (<div key={app.name} className={Styles.appItem}>
    <Icon src={app.icon} width={32} />
    <span className={Styles.text}>{app.name}</span>
  </div>)
}
const MatchApp = ({ app }) => {
  const dispatch = useDispatch();
  const activeName = useSelector(state => {
    return state.searchmenu.activeName
  })
  return (
    <div key={app.name} className={Styles.matchAppItem} data-active={activeName === app.name} onClick={() => {
      dispatch(Actions.SEARCHACTIVE(app.name))
    }}>
      <div className={Styles.appContent}>
        <Icon src={app.icon} width={18} />
        <span className={Styles.text}>{app.name}</span>
      </div>
      <div className={Styles.rightBox}>
        <Icon src="rightArrow" className={Styles.rightArrow} width={18} />
      </div>
    </div>
  )
}
const MatchListApp = ({ match }) => {
  return match.length > 0 ?
    <>
      <div className={Styles.appListText}>
        应用
      </div>
      {
        match.slice(1).map(app => <MatchApp app={app} />)
      }
    </> : null
}
export const SearchMenu = () => {
  const { align } = useSelector((state) => state.taskbar);
  const search = useSelector((state) => {
    var arr = JSON.parse(JSON.stringify(state.searchmenu))
    let tmpApps = Object.keys(state.apps)
      .filter((x) => x != "hz" && x != "appOrder")
      .map((key) => {
        return state.apps[key];
      });
    tmpApps.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    arr.allApps = tmpApps;
    return arr;
  });
  const [match, setMatch] = useState([]);
  const [tab, setTab] = useState("all");
  // const [pwctrl, setPowCtrl] = useState

  const dispatch = useDispatch();
  const swtab = (value) => {
    setTab(value);
  };

  const clickDispatch = (event) => {
    let type = event.currentTarget.dataset.action;
    let payload = event.currentTarget.dataset.payload;
    let action = {
      type,
      payload,
    };
    if (type) {
      dispatch(Actions[type](payload));
    }

    if (
      action.type &&
      (action.payload == "full" || action.type == "EDGELINK")
    ) {
      dispatch(Actions["STARTHIDE"]);
    }

    if (action.type == "STARTALPHA") {
      var target = document.getElementById("char" + action.payload);
      if (target) {
        target.parentNode.scrollTop = target.offsetTop;
      } else {
        var target = document.getElementById("charA");
        target.parentNode.scrollTop = 0;
      }
    }
  };

  useEffect(() => {
    if (search.query.length) {
      let matches = []
      for (var i = 0; i < search.allApps.length; i++) {
        if (search.allApps[i].name.toLowerCase().includes(search.query.toLowerCase())) {
          matches.push(search.allApps[i])
        }
      }
      matches.length > 0 && dispatch(Actions.SEARCHACTIVE(matches[0].name))
      setMatch(matches);
    }
  }, [search.query]);
  const speedSearchTipApps = [
    {
      name: "新闻",
      icon: "newsSearch",
    },
    {
      name: "天气",
      icon: "weatherSearch",
    },
  ]
  return (
    <div
      className="searchMenu dpShad"
      data-hide={search.hide}
      style={{ "--prefix": "SEARCH" }}
      data-align={align}
    >
      <div className={Styles.searchTab}>
        <div className={Styles.chooses}>
          <div className={Styles.tab} value={tab === "all"} onClick={() => swtab("all")}>全部</div>
          <div className={Styles.tab} value={tab === "app"} onClick={() => swtab("app")}>应用</div>
          <div className={Styles.tab} value={tab === "doc"} onClick={() => swtab("doc")}>文档</div>
          <div className={Styles.tab} value={tab === "web"} onClick={() => swtab("web")}>网页</div>
          <div className={Styles.tab} style={{ marginLeft: "10px" }}>更多
            <Icon src="moreArrow" width={12} height={12} margin="0 0 0 5px" />
          </div>
        </div>
        <div className={Styles.close}>
          <Icon src="searchOption" width={25} height={25} />
          <Icon
            src="close"
            ui
            width={18}
          />
        </div>
      </div>
      <div className={Styles.searchContent}>
        {
          search.query ? <>
            <div className={Styles.bestMatch}>
              <div className={Styles.bestText}>
                最佳匹配
              </div>
              <div className={Styles.bestApp} data-active={match[0]?.name == search.activeName}>
                <div className={Styles.iconBox}>
                  <Icon src={match.length > 0 ? match[0].icon : "search"} width={35} height={35} />
                </div>
                <div className={Styles.infoBox}>
                  <div className={Styles.appName}>
                    {match.length > 0 ? match[0].name : search.query}
                  </div>
                  <div className={Styles.appType}>

                    {match.length > 0 ? "应用" : "查看更多搜索结果"}
                  </div>
                </div>
              </div>
              <MatchListApp match={match} />
            </div>
            <div className={Styles.info}>
            </div>
          </> :
            <>
              <div className={Styles.recommand}>
                <div className={Styles.title}>
                  推荐
                </div>
                <div className={Styles.content}>{
                  search.rcApps.map(app => (
                    // <div key={app.name} className={Styles.item}>
                    //   <Icon src={app.icon} width={32} />
                    //   <span className={Styles.text}>{app.name}</span>
                    // </div>
                    <AppItem key={app.name} app={app} />
                  ))
                }
                </div>
              </div>
              <div className={Styles.hotContent}>
                <div className={Styles.hotApp}>
                  <div className={Styles.title}>
                    热门应用
                  </div>
                  <div className={Styles.appBox}>
                    {
                      search.pnApps.slice(0, 6).map(app => (
                        <PnApp key={app.name} {...app} />
                      ))
                    }
                  </div>
                </div>
                <div className={Styles.hotSearch}>
                  <div className={Styles.title}>
                    快速搜索
                  </div>
                  {
                    speedSearchTipApps.map(app => (<AppItem key={app.name} app={app} />))
                  }
                </div>
              </div>

            </>
        }
      </div>
    </div>
  );
};
