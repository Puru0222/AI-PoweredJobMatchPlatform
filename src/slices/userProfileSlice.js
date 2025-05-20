// src/redux/slices/userProfileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  experience: 0,
  skills: [],
  preferredJobType: 'any',
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      const { location, experience, skills, preferredJobType } = action.payload;
      state.location = location || '';
      state.experience = experience || 0;
      state.skills = skills || [];
      state.preferredJobType = preferredJobType || 'any';
    },
    clearUserProfile: (state) => {
      state.location = '';
      state.experience = 0;
      state.skills = [];
      state.preferredJobType = 'any';
    },
  },
});

export const { setUserProfile, clearUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
