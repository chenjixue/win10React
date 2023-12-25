import icons from "./apps";
var { taskbar, desktop } = {
    taskbar: (localStorage.getItem("taskbar") &&
        JSON.parse(localStorage.getItem("taskbar"))) || [
            "Settings",
            "File Explorer",
            "Browser",
            "Store",
            // "Spotify",
        ],
    desktop: (localStorage.getItem("desktop") &&
        JSON.parse(localStorage.getItem("desktop"))) || [
            "Blue",
            "Unescape",
            "Recycle Bin",
            "File Explorer",
            "Store",
            "Browser",
            "Github",
            // "Spotify",
            // "Buy me a coffee",
        ]
};
export const taskApps = icons.filter((x) => taskbar.includes(x.name));
export const allApps = icons.filter((app) => {
    return app.type === "app";
});
export const desktopApps = icons
    .filter((x) => desktop.includes(x.name))
    .sort((a, b) => {
        return desktop.indexOf(a.name) > desktop.indexOf(b.name) ? 1 : -1;
    });
export const dfApps = {
    taskbar,
    desktop,
};

