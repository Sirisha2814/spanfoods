import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import orderReducer from '@/features/menu/orderslice'

 const store = configureStore({
  reducer: {
    auth: authReducer,
    orders:orderReducer
  },
})
export default store