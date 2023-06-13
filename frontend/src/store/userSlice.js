import { createSlice } from '@reduxjs/toolkit';

const userSlise = createSlice({
  name: 'user',
  initialState: {
    user: {},
    users: {},
    profile: null,
  },

  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
    },
    setAllUsers(state, action) {
      state.users = action.payload;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const { setUserData, setAllUsers, setProfile } = userSlise.actions;
export default userSlise.reducer;
