import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(localeData);
dayjs.extend(weekday);
import App from './App.jsx'
import './index.css'
import store from './store'
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
