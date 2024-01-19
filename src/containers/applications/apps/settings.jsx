import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { changeTheme } from "../../../actions";
import { Image, ToolBar, Icon } from "../../../utils/general";
// import LangSwitch from "./assets/Langswitch";
import Styles from "./assets/settings.module.scss";
// import data from "./assets/settingsData.json";
export const SettingTask = (props) => {
  let { iconSrc, title, content } = props
  return (
    <div className={Styles.SettingTask}>
      <div className={Styles.icon}>
        <Icon src={iconSrc} width={40} />
      </div>
      <div className={Styles.SettingTaskContent}>
        <div className={Styles.titleText}>{title}</div>
        <div className={Styles.contentText}>{content}</div>
      </div>
    </div>
  )

}
export const Settings = () => {
  let settingsArr = [
    {
      iconSrc: "settingSystem",
      title: "系统",
      content: "显示、声音、通知"
    },
    {
      iconSrc: "settingDevice",
      title: "设备",
      content: "蓝牙、打印机、鼠标"
    },
    {
      iconSrc: "settingPhone",
      title: "手机",
      content: "连接Android设备和iphone"
    },
    {
      iconSrc: "settingNetwork",
      title: "网络和Internet",
      content: "WLAN、飞行模式、VPN"
    },
    {
      iconSrc: "settingGexing",
      title: "个性化",
      content: "背景、锁屏、颜色"
    },
    {
      iconSrc: "settingApplication",
      title: "应用",
      content: "卸载、默认值"
    },
    {
      iconSrc: "settingAccount",
      title: "账户",
      content: "你的帐户、e电子邮件、同步设置、工作、家庭"
    },
    {
      iconSrc: "settingTime",
      title: "时间和语言",
      content: "语音、区域、口期"
    },
    {
      iconSrc: "settingGame",
      title: "游戏",
      content: "Game Bar,捕获,游戏模式"
    },
    {
      iconSrc: "settingQingsongUse",
      title: "轻松使用",
      content: "讲述人、放大镜、高对比度"
    },
    {
      iconSrc: "settingFangdajing",
      title: "搜索",
      content: "查找我的文件、权限"
    },
    {
      iconSrc: "settingLock",
      title: "隐私",
      content: "位置、摄像头、麦克风"
    },
    {
      iconSrc: "settingRefresh",
      title: "更新和安全",
      content: "Windows 更新、恢复、备份"
    },
  ]
  const wnapp = useSelector((state) => state.apps.settings);
  return (
    <div
      className={`${Styles.settingsApp} floatTab dpShad`}
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="Settings"
      >
        <span className={Styles.title}>
          设置
        </span>
      </ToolBar>
      <div className={Styles.settingContent} >
        <div className={Styles.titleName}>
          Windows 设置
        </div>
        <div className={Styles.search}>
          <input type="text" placeholder="查找设置" />
        </div>
        <div className={Styles.settingTaskBox}>
          {
            settingsArr.map(settingOption => (<SettingTask key={settingOption.iconSrc} {...settingOption} />))
          }
        </div>
      </div>
    </div>
  );
};
