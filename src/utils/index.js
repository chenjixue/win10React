import icons from "./apps";
var { taskbar } = {
    taskbar: (localStorage.getItem("taskbar") &&
        JSON.parse(localStorage.getItem("taskbar"))) || [
            "Settings",
            "File Explorer",
            "Browser",
            "Store",
            "Spotify",
        ],
};
export const taskApps = icons.filter((x) => taskbar.includes(x.name));
export const allApps = icons.filter((app) => {
    return app.type === "app";
});
