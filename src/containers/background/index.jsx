import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Battery from "../../components/shared/Battery";
import { Icon, Image } from "../../utils/general";
import { Actions } from "@/store"
import Styles from "./back.module.scss";
export const Background = () => {
  const wall = useSelector((state) => state.wallpaper);
  return (
    <div
      className={Styles.background}
      style={{
        backgroundImage: `url(img/wallpaper/${wall.src})`,
      }}
    ></div>
  );
};

export const BootScreen = (props) => {
  const dispatch = useDispatch();
  const wall = useSelector((state) => state.wallpaper);
  const [blackout, setBlackOut] = useState(false);

  useEffect(() => {
    if (props.dir < 0) {
      setTimeout(() => {
        console.log("blackout");
        setBlackOut(true);
      }, 4000);
    }
  }, [props.dir]);

  useEffect(() => {
    if (props.dir < 0) {
      if (blackout) {
        if (wall.act == "restart") {
          setTimeout(() => {
            setBlackOut(false);
            setTimeout(() => {
              dispatch(Actions.WALLBOOTED());
            }, 4000);
          }, 2000);
        }
      }
    }
  }, [blackout]);

  return (
    <div className={Styles.bootscreen}>
      <div className={blackout ? Styles.hidden : ""}>
        <Image src="asset/bootlogo" w={180} />
        <div className="mt-48" id="loader">
          <svg
            className={Styles.progressRing}
            height={48}
            width={48}
            viewBox="0 0 16 16"
          >
            <circle cx="8px" cy="8px" r="7px"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export const LockScreen = (props) => {
  const wall = useSelector((state) => state.wallpaper);
  const [lock, setLock] = useState(false);
  const [unlocked, setUnLock] = useState(false);
  const [password, setPass] = useState("");
  const [passType, setType] = useState(1);
  const [forgot, setForget] = useState(false);
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.setting.person.name);

  const action = (e) => {
    var act = e.target.dataset.action,
      payload = e.target.dataset.payload;

    if (act == "splash") setLock(true);
    else if (act == "inpass") {
      var val = e.target.value;
      if (!passType) {
        val = val.substring(0, 4);
        val = !Number(val) ? "" : val;
      }

      setPass(val);
    } else if (act == "forgot") setForget(true);
    else if (act == "pinlock") setType(0);
    else if (act == "passkey") setType(1);

    if (act == "pinlock" || act == "passkey") setPass("");
  };

  const proceed = () => {
    setUnLock(true);
    setTimeout(() => {
    }, 1000);
    dispatch(Actions.WALLUNLOCK());
  };

  const action2 = (e) => {
    if (e.key == "Enter") proceed();
  };
  let time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  })
  let day = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 处理回车事件
      proceed()
    }
  }
  day = day.slice(0, 4) + "," + day.slice(4)
  return (
    <div
      className={Styles.lockscreen + " " + (props.dir == -1 ? Styles.slowfadein : "")}
      data-unlock={unlocked}
      style={{
        backgroundImage: `url(${`img/wallpaper/lock.jpg`})`,
      }}
      onClick={action}
      data-action="splash"
      data-blur={lock}
    >
      <div className={`${Styles.splashScreen}`} data-faded={lock}>
        <div className={`${Styles.time}`}>
          {time}
        </div>
        <div className={`${Styles.day}`}>
          {day}
        </div>
      </div>
      <div className={Styles.fadeinScreen} data-faded={!lock} data-unlock={unlocked}>
        <Icon src="LockScreenAcount" width={126} />
        <div className={Styles.name}>chenjixue</div>
        <div className={Styles.inputBox}>
          <input type="text" placeholder="密码:随便输入没做限制" onKeyDown={handleKeyDown} /><Icon src="rightArrowWhite" onClick={proceed} className={Styles.rightArrow} width={26} />
        </div>
        {/* </div> */}

      </div>
      <div className={Styles.bottomInfo}>
        <Icon className="mx-2" src="wifiWhite" width={22} invert />
        {lock ?
          <>
            <Icon className="mx-2" src="easyToUse" width={25} invert />
            <Icon className="mx-2" src="startUpWhite" width={22} invert />
          </> : null
        }
      </div>
    </div>
  );
};

