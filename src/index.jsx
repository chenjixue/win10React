import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween);
dayjs.extend(localeData);
dayjs.extend(weekday);
import App from './App.jsx'
import './index.css'
import store from './store'
// window.console.log = () => {};
ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense
    fallback={
      <div id="sus-fallback">
        <h1>Loading</h1>
      </div>
    }
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
)
