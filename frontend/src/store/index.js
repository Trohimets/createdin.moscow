import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import modalSlice from "./modalSlice";
// import authSlice from "./authSlice";
// import modalSlice from "./modalSlice";

export default configureStore({
  reducer: {
    cards: dataSlice,
    filtered: filterSlice,
    auth: authSlice,
    user: userSlice,
    modal: modalSlice,
  },
});