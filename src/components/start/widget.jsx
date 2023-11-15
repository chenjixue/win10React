import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, LazyComponent } from "../../utils/general";
import Styles from "./widget.module.scss";
import { Actions } from "@/store"
export const ControlIcon = (props) => {
  const dispatch = useDispatch();
  let { src, width, isOpen, text, height } = props
  const onOpen = (src) => {
    dispatch(Actions.ICONOPEN(src))
  }
  return (<div onClick={() => onOpen(src)} className={`${Styles.controlIcon} ${isOpen ? Styles.isOpen : ''}`}>
    <Icon src={src} width={width} height={height && width} />
    <div className={Styles.text}>{text}</div>
  </div>)
}
export const FunctionalIcon = () => {
  let controlIconsData = useSelector((state) => state.widpane.controlIcons);
  return <div className={Styles.functionalIcon}>
    <div className={Styles.operationText}>折叠</div>
    <div className={Styles.controlIconsData}>
      {
        controlIconsData.map(iconObject => {
          return <ControlIcon key={iconObject.src} {...iconObject} />
        })
      }
    </div>
  </div>
}
export const WidPane = () => {
  const dispatch = useDispatch();
  const widget = useSelector((state) => state.widpane);
  const theme = useSelector((state) => state.setting.person.theme);
  const getRandom = (x = 0) => {
    if (theme == "light")
      return `hsl(${Math.floor(Math.random() * 360)}deg 36% 84%)`;
    if (theme == "dark")
      return `hsl(${Math.floor(Math.random() * 360)}deg 36% 16%)`;
  };

  return (
    <div
      className={Styles.widPaneCont}
      data-hide={widget.hide}
      style={{ "--prefix": "WIDG" }}
    >
      <LazyComponent show={!widget.hide}>
        <div className={`${Styles.WidPane} win11Scroll`}>
          <div className={Styles.notice}></div>
          <FunctionalIcon />
        </div>
      </LazyComponent>
    </div>
  );
};
