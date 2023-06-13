import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'cards',
  initialState: {
    objects: {},
    active: null
  },

  reducers: {
    setObjects(state, action) {
      state.objects = action.payload;
    },
    setComments(state, action) {
      state.comments = action.payload
    },
    setBooking(state, action) {
      state.booking = action.payload
    },

    setActivePlace(state, action) {
      state.active = action.payload
    }, 
    deleteActivePlace(state) {
      state.active = null
    }

  },
});

export const { setObjects, setComments, setBooking, setActivePlace, deleteActivePlace } = dataSlice.actions;
export default dataSlice.reducer;