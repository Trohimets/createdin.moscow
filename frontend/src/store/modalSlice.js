import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalIsOpened: false,
    modalReqIsOpened: false,
    title: "",
    status: null,
    message: "",
    date: "",
    id: ""
  },

  reducers: {
    openModal(state, action) {
      state.modalIsOpened = true;
      state.title = action.payload.text;
      state.status = action.payload.status
    },
    closeModal(state) {
      state.modalIsOpened = false;
      state.modalReqIsOpened = false,
      state.success = false;
      state.title = "";
    },
    openModalReq(state, action) {
      state.modalReqIsOpened = true;
    }
  },
});

export const { openModal, closeModal, openModalReq } = modalSlice.actions;
export default modalSlice.reducer;
