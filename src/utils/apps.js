export const gene_name = () =>
  Math.random().toString(36).substring(2, 10).toUpperCase();

let installed = JSON.parse(localStorage.getItem("installed") || "[]");

const apps = [
  {
    name: "Start",
    icon: "home",
    type: "action",
    action: "STARTMENU",
  },
  {
    name: "Search",
    icon: "search",
    type: "action",
    action: "SEARCHMENU",
  },
  {
    name: "Widget",
    icon: "widget",
    type: "action",
    action: "WIDGETS",
  },
  {
    name: "Settings",
    icon: "settings",
    type: "app",
    action: "SETTINGS",
  },
  {
    name: "Task Manager",
    icon: "taskmanager",
    type: "app",
    action: "TASKMANAGER",
  },
  {
    name: "File Explorer",
    icon: "explorer",
    type: "app",
    action: "EXPLORER",
  },
  {
    name: "Browser",
    icon: "edge",
    type: "app",
    action: "MSEDGE",
  },
  {
    name: "Store",
    icon: "store",
    type: "app",
    action: "WNSTORE",
  },
  {
    name: "Recycle Bin",
    icon: "bin0",
    type: "app",
    action: "EXPLORER",
  },
  {
    name: "Blue",
    icon: "win/user",
    type: "app",
    action: "EXPLORER",
  },
  {
    name: "Alarms",
    icon: "alarm",
    type: "app",
  },
  {
    name: "Calculator",
    icon: "calculator",
    type: "app",
    action: "CALCUAPP",
  },
  {
    name: "Calendar",
    icon: "calendar",
    type: "app",
  },
  {
    name: "Camera",
    icon: "camera",
    type: "app",
    action: "CAMERA",
  },
  {
    name: "Your Phone",
    icon: "yphone",
    type: "app",
  },
  {
    name: "Feedback",
    icon: "feedback",
    type: "app",
  },
  {
    name: "Get Started",
    icon: "getstarted",
    type: "app",
    action: "OOBE",
  },
  {
    name: "Groove Music",
    icon: "groove",
    type: "app",
  },
  {
    name: "Help",
    icon: "help",
    type: "app",
    action: "EXTERNAL",
    payload: "https://win11react-docs.andrewstech.me/",
  },
  {
    name: "Jitsi Meet",
    icon: "https://avatars.githubusercontent.com/u/3671647",
    type: "app",
    data: {
      type: "IFrame",
      url: "https://meet.jit.si/",
      gallery: [
        "https://www.icescrum.com/wp-content/uploads/2020/03/jitsi1.png"
      ],
      desc: "Jitsi Meet is a fully encrypted, 100% open source video conferencing solution.",
      feat: "video conferencing solution."
    },
    pwa: true,
    action: "M58GOH12",
  },
  // {
  //   name: "MDown Editor",
  //   icon: "https://github.com/RedEdge967/mdown-editor/raw/master/favicon.png",
  //   type: "app",
  //   data: {
  //     type: "IFrame",
  //     url: "https://rededge967.github.io/mdown-editor/",
  //     gallery: [
  //       "https://user-images.githubusercontent.com/91379432/155248594-05ffaa5e-29d4-4935-b681-ebdfd2ba8796.png"
  //     ],
  //     desc: "A free open source markdown editor to play with codes",
  //     feat: "A Markdown playground with a preview panel to play with codes written in JS, HTML5 and CSS3"
  //   },
  //   pwa: true,
  //   action: "T32EBVVQ",
  // },
  {
    name: "Yammer",
    icon: "yammer",
    type: "app",
  },
  {
    name: "Mail",
    icon: "mail",
    type: "app",
    action: "EXTERNAL",
    payload: "mailto:blueedgetechno@gmail.com",
  },
  {
    name: "Movies",
    icon: "movies",
    type: "app",
  },
  {
    name: "Xbox",
    icon: "xbox",
    type: "app",
  },
  {
    name: "Office",
    icon: "msoffice",
    type: "app",
  },
  {
    name: "Narrator",
    icon: "narrator",
    type: "app",
  },
  {
    name: "News",
    icon: "news",
    type: "app",
  },
  {
    name: "Notepad",
    icon: "notepad",
    type: "app",
    action: "NOTEPAD",
  },
  {
    name: "Sticky Notes",
    icon: "notes",
    type: "app",
  },
  // {
  //   name: "OneDrive",
  //   icon: "oneDrive",
  //   type: "app",
  // },
  {
    name: "OneNote",
    icon: "onenote",
    type: "app",
  },
  {
    name: "Outlook",
    icon: "outlook",
    type: "app",
  },
  {
    name: "People",
    icon: "people",
    type: "app",
  },
  {
    name: "Photos",
    icon: "photos",
    type: "app",
  },
  {
    name: "Pinterest",
    icon: "pinterest",
    type: "app",
    action: "EXTERNAL",
    payload: "https://www.pinterest.com/blueedgetechno/",
  },
  {
    name: "Security",
    icon: "security",
    type: "app",
  },
  {
    name: "Spotify",
    icon: "spotify",
    type: "app",
    action: "SPOTIFY",
  },
  {
    name: "Sharepoint",
    icon: "share",
    type: "app",
  },
  {
    name: "Skype",
    icon: "skype",
    type: "app",
  },
  {
    name: "Snipping Tool",
    icon: "snip",
    type: "app",
  },
  {
    name: "Teams",
    icon: "teams",
    type: "app",
  },
  {
    name: "Terminal",
    icon: "terminal",
    type: "app",
    action: "TERMINAL",
  },
  {
    name: "Tips",
    icon: "tips",
    type: "app",
  },
  {
    name: "To Do",
    icon: "todo",
    type: "app",
  },
  {
    name: "Maps",
    icon: "maps",
    type: "app",
  },
  {
    name: "Voice Recorder",
    icon: "voice",
    type: "app",
  },
  {
    name: "Weather",
    icon: "weather",
    type: "app",
  },
  {
    name: "Cortana",
    icon: "cortana",
    type: "app",
  },
  {
    name: "Github",
    icon: "github",
    type: "app",
    action: "EXTERNAL",
    payload: "https://github.com/chenjixue/win10React",
  },
  {
    name: "Unescape",
    icon: "unescape",
    type: "action",
    action: "EXTERNAL",
    payload: "https://blueedge.me/unescape",
  },
  {
    name: "Discord",
    icon: "discord",
    type: "app",
    action: "DISCORD",
  },
];

for (let i = 0; i < installed.length; i++) {
  installed[i].action = gene_name();
  apps.push(installed[i]);
}
export default apps;
