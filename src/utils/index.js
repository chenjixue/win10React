import icons from "./apps";
var { taskbar, desktop, pinned, recent } = {
    taskbar: (localStorage.getItem("taskbar") &&
        JSON.parse(localStorage.getItem("taskbar"))) || [
            "Settings",
            "Browser",
            "Store",
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
            "Jitsi Meet",
            "MDown Editor"
        ],
    pinned: (localStorage.getItem("pinned") &&
        JSON.parse(localStorage.getItem("pinned"))) || [
            "Browser",
            "Get Started",
            "Task Manager",
            "Mail",
            "Settings",
            "Store",
            "Unescape",
            "Buy me a coffee",
            "Notepad",
            "Whiteboard",
            "Calculator",
            "Twitter",
            "File Explorer",
            "Terminal",
            "Github",
            "Discord",
            "Camera",
        ],
    recent: (localStorage.getItem("recent") &&
        JSON.parse(localStorage.getItem("recent"))) || [
            "Mail",
            "Twitter",
            "Terminal",
            "Github",
            "File Explorer",
            "Edge",
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
export const recentApps = icons
    .filter((x) => pinned.includes(x.name))
    .sort((a, b) => {
        return pinned.indexOf(a.name) > pinned.indexOf(b.name) ? 1 : -1;
    });

export const pinnedApps = icons
    .filter((x) => recent.includes(x.name))
    .sort((a, b) => {
        return recent.indexOf(a.name) > recent.indexOf(b.name) ? 1 : -1;
    });
export const dfApps = {
    taskbar,
    desktop,
    pinnedApps,
    recentApps
};

