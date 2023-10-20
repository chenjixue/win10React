import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'

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
