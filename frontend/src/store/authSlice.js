import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    token: ''
  },

  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
    setLoggedOut(state) {
      state.loggedIn = false;
    },

    setToken(state, action) {
      state.token = action.payload;
    },

    deleteToken(state) {
      state.token = '';
    }
  }
});

export const { setLoggedIn, setLoggedOut, setToken, deleteToken } = authSlice.actions;
export default authSlice.reducer;