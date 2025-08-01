import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import { setupGlobalErrorHandling } from './utils/errorHandler.js'
import './index.css'

// Setup global error handling
setupGlobalErrorHandling();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)