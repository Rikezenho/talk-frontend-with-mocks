import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import { startMockServer } from './mock/server'
import { REACT_APP_ACTIVATE_MOCK } from './configs'

if (REACT_APP_ACTIVATE_MOCK === 'true') {
  startMockServer()
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
