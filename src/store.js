import { configureStore } from "@reduxjs/toolkit";
import toastReducer from './slice/toastSlice';
import FlashModalReducer from './slice/flashModalSlice';
import wishListReducer from './slice/wishListSlice';
import cartReducer from './slice/cartSlice';
import loginReducer from './slice/loginSlice';
export default configureStore({
  reducer:{
    toastAtStore:toastReducer,
    flashModalAtStore:FlashModalReducer,
    wishListAtStore:wishListReducer,
    cartAtStore:cartReducer,
    loginAtStore:loginReducer
  }
});