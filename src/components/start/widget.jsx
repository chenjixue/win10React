import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, LazyComponent } from "../../utils/general";
import "./widget.scss";

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
      className="widPaneCont"
      data-hide={widget.hide}
      style={{ "--prefix": "WIDG" }}
    >
      <LazyComponent show={!widget.hide}>
        <div className="WidPane win11Scroll">
        </div>
      </LazyComponent>
    </div>
  );
};
