import { configureStore } from "@reduxjs/toolkit";
import toastReducer from './slice/toastSlice';
import FlashModalReducer from './slice/flashModalSlice';
import wishListReducer from './slice/wishListSlice';
export default configureStore({
  reducer:{
    toastAtStore:toastReducer,
    flashModalAtStore:FlashModalReducer,
    wishListAtStore:wishListReducer
  }
});