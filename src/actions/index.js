import { dfApps } from "../utils";
import { gene_name } from "@/utils/apps";
import { Actions } from "@/store"
import store from "@/store";
export const dispatchAction = (event) => {
  let actionName = event.currentTarget.dataset.action
  let createAction = Actions[actionName]
  let payload = event.currentTarget.dataset.payload
  if (createAction) {
    store.dispatch(createAction(payload));
  } else if (actionName) {
    let action = {
      type: actionName,
      payload
    }

    store.dispatch(action)
  }
};
// mostly file explorer
export const handleFileOpen = (id) => {
  // handle double click open
  const item = store.getState().files.data.getId(id);
  if (item != null) {
    if (item.type == "folder") {
      store.dispatch({ type: "FILEDIR", payload: item.id });
    }
  }
};
export const installApp = (data) => {
  var app = { ...data, type: "app", pwa: true };

  var installed = localStorage.getItem("installed");
  if (!installed) installed = "[]";

  installed = JSON.parse(installed);
  installed.push(app);
  localStorage.setItem("installed", JSON.stringify(installed));

  var desk = localStorage.getItem("desktop");
  if (!desk) desk = dfApps.desktop;
  else desk = JSON.parse(desk);

  desk.push(app.name);
  localStorage.setItem("desktop", JSON.stringify(desk));

  app.action = gene_name();
  app.action = gene_name();
  console.log(app,"app-----111")
  store.dispatch({ type: "ADDAPP", payload: app });
  store.dispatch(Actions["DESKADD"](app));
  store.dispatch({ type: "WNSTORE", payload: "mnmz" });
};

