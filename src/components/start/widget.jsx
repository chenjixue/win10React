import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, LazyComponent } from "../../utils/general";
import Styles from "./widget.module.scss";
import { Actions } from "@/store"

export const ControlIcon = (props) => {
  const dispatch = useDispatch();
  let { src, width, isOpen, text, height } = props
  let dataAction = props["data-action"]
  const onOpen = (src) => {
    if (dataAction) {
      dispatch(Actions[dataAction]())
    }
    dispatch(Actions.ICONOPEN(src))
  }
  return (<div onClick={() => onOpen(src)} className={`${Styles.controlIcon} ${isOpen ? Styles.isOpen : ''}`}>
    <Icon src={src} width={width} height={height && width} />
    <div className={Styles.text}>{text}</div>
  </div>)
}
export const FunctionalIcon = () => {
  // let controlIconsData = useSelector((state) => state.widpane.controlIcons);
  const dispatch = useDispatch();
  let widpane = useSelector((state) => state.widpane);
  let clickFold = () => {
    console.log("clickFold----")
    dispatch(Actions.WIDGFOLD())
  }
  console.log(widpane, "widpane----")
  return <div className={Styles.functionalIcon}>
    <div className={Styles.operationText} onClick={clickFold}>{widpane.fold ? '展开' : '折叠'}</div>
    <div className={`${Styles.controlIconsData} ${widpane.fold ? Styles.fold : ""}`}>
      {
        widpane.controlIcons.map(iconObject => {
          return <ControlIcon key={iconObject.src} {...iconObject} />
        })
      }
    </div>
  </div>
}
export const WidPane = () => {
  const dispatch = useDispatch();
  const widget = useSelector((state) => state.widpane);
  // const theme = useSelector((state) => state.setting.person.theme);
  // const getRandom = (x = 0) => {
  //   if (theme == "light")
  //     return `hsl(${Math.floor(Math.random() * 360)}deg 36% 84%)`;
  //   if (theme == "dark")
  //     return `hsl(${Math.floor(Math.random() * 360)}deg 36% 16%)`;
  // };

  return (
    <div
      className={Styles.widPaneCont}
      data-hide={widget.hide}
      style={{ "--prefix": "WIDG" }}
    >
      <LazyComponent show={!widget.hide}>
        <div className={`${Styles.WidPane}`}>
          <div className={Styles.notice}>没有新通知</div>
          <FunctionalIcon />
        </div>
      </LazyComponent>
    </div>
  );
};
