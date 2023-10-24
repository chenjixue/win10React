import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import "./general.scss";

import * as FaIcons from "@fortawesome/free-solid-svg-icons";
import * as FaRegIcons from "@fortawesome/free-regular-svg-icons";
import * as AllIcons from "./icons";

export const Icon = (props) => {
  const dispatch = useDispatch();
  var src = `img/icon/${props.ui != null ? "ui/" : ""}${props.src}.png`;
  if (props.ext != null || (props.src && props.src.includes("http"))) {
    src = props.src;
  }

  var prtclk = "";
  if (props.src) {
    if (props.onClick != null || props.pr != null) {
      prtclk = "prtclk";
    }
  }

  const clickDispatch = (event) => {
    var action = {
      type: event.currentTarget.dataset.action,
      payload: event.currentTarget.dataset.payload,
    };

    if (action.type) {
      dispatch(action);
    }
  };
  console.log(props.fafa,"props.fafa----")
  if (props.fafa != null) {
    return (
      <div
        className={`uicon prtclk ${props.className || ""}`}
        onClick={props.onClick || (props.click && clickDispatch) || null}
        data-action={props.click}
        data-payload={props.payload}
        data-menu={props.menu}
      >
        <FontAwesomeIcon
          data-flip={props.flip != null}
          data-invert={props.invert != null ? "true" : "false"}
          data-rounded={props.rounded != null ? "true" : "false"}
          style={{
            width: props.width,
            height: props.height || props.width,
            color: props.color || null,
            margin: props.margin || null,
          }}
          icon={
            props.reg == null ? FaIcons[props.fafa] : FaRegIcons[props.fafa]
          }
        />
      </div>
    );
  } else if (props.icon != null) {
    var CustomIcon = AllIcons[props.icon];
    return (
      <div
        className={`uicon prtclk ${props.className || ""}`}
        onClick={props.onClick || (props.click && clickDispatch) || null}
        data-action={props.click}
        data-payload={props.payload}
        data-menu={props.menu}
      >
        <CustomIcon
          data-flip={props.flip != null}
          data-invert={props.invert != null ? "true" : "false"}
          data-rounded={props.rounded != null ? "true" : "false"}
          style={{
            width: props.width,
            height: props.height || props.width,
            fill: props.color || null,
            margin: props.margin || null,
          }}
        />
      </div>
    );
  } else {
    return (
      <div
        className={`uicon ${props.className || ""} ${prtclk}`}
        data-open={props.open}
        data-action={props.click}
        data-active={props.active}
        data-payload={props.payload}
        onClick={props.onClick || (props.pr && clickDispatch) || null}
        data-menu={props.menu}
        data-pr={props.pr}
      >
        {props.className == "tsIcon" ? (
          <div
            onClick={props.click != null ? clickDispatch : null}
            style={{ width: props.width, height: props.width }}
            data-action={props.click}
            data-payload={props.payload}
            data-click={props.click != null}
            data-flip={props.flip != null}
            data-invert={props.invert != null ? "true" : "false"}
            data-rounded={props.rounded != null ? "true" : "false"}
          >
            <img
              width={props.width}
              height={props.height}
              data-action={props.click}
              data-payload={props.payload}
              data-click={props.click != null}
              data-flip={props.flip != null}
              data-invert={props.invert != null ? "true" : "false"}
              data-rounded={props.rounded != null ? "true" : "false"}
              src={src}
              style={{
                margin: props.margin || null,
              }}
              alt=""
            />
          </div>
        ) : (
          <img
            width={props.width}
            height={props.height}
            onClick={props.click != null ? clickDispatch : null}
            data-action={props.click}
            data-payload={props.payload}
            data-click={props.click != null}
            data-flip={props.flip != null}
            data-invert={props.invert != null ? "true" : "false"}
            data-rounded={props.rounded != null ? "true" : "false"}
            src={src}
            style={{
              margin: props.margin || null,
            }}
            alt=""
          />
        )}
      </div>
    );
  }
};
