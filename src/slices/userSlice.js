// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  email: '',
  token: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, name, email, token } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.token = token;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = '';
      state.email = '';
      state.token = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
