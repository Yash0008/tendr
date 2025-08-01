import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './redux/tendrSlice.js'
import authReducer from './redux/authSlice.js'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
})

export default store;