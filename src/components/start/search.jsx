import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@/utils/general";
import { Actions } from "@/store";
import Styles from "./searchmenu.module.scss"
export const SearchMenu = () => {
  const { align } = useSelector((state) => state.taskbar);
  const start = useSelector((state) => {
    var arr = JSON.parse(JSON.stringify(state.searchmenu)),
      ln = (6 - (arr.pnApps.length % 6)) % 6;

    for (var i = 0; i < ln; i++) {
      arr.pnApps.push({
        empty: true,
      });
    }
    for (i = 0; i < arr.rcApps.length; i++) {
      if (arr.rcApps[i].lastUsed < 0) {
        arr.rcApps[i].lastUsed = "Recently Added";
      } else if (arr.rcApps[i].lastUsed < 10) {
        arr.rcApps[i].lastUsed = "Just Now";
      } else if (arr.rcApps[i].lastUsed < 60) {
        arr.rcApps[i].lastUsed += "m ago";
      } else if (arr.rcApps[i].lastUsed < 360) {
        arr.rcApps[i].lastUsed =
          Math.floor(arr.rcApps[i].lastUsed / 60) + "h ago";
      }
    }
    var allApps = [],
      tmpApps = Object.keys(state.apps)
        .filter((x) => x != "hz" && x != "appOrder")
        .map((key) => {
          return state.apps[key];
        });

    tmpApps.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

    for (i = 0; i < 27; i++) {
      allApps[i] = [];
    }

    for (i = 0; i < tmpApps.length; i++) {
      var t1 = tmpApps[i].name.trim().toUpperCase().charCodeAt(0);
      if (t1 > 64 && t1 < 91) {
        allApps[t1 - 64].push(tmpApps[i]);
      } else {
        allApps[0].push(tmpApps[i]);
      }
    }

    arr.contApps = allApps;
    arr.allApps = tmpApps;
    return arr;
  });

  const [query, setQuery] = useState("");
  const [match, setMatch] = useState({});
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
    if (query.length) {
      for (var i = 0; i < start.allApps.length; i++) {
        if (start.allApps[i].name.toLowerCase().includes(query.toLowerCase())) {
          setMatch(start.allApps[i]);
          break;
        }
      }
    }
  }, [query]);

  const userName = useSelector((state) => state.setting.person.name);

  return (
    <div
      className="searchMenu dpShad"
      data-hide={start.hide}
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
    </div>
  );
};
