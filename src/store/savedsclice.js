import { createSlice } from '@reduxjs/toolkit';

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    stories: []
  },
  reducers: {
    addSavedStory: (state, action) => {
      const existingStory = state.stories.find(story => story.id === action.payload.id);
      
      if (!existingStory) {
        state.stories.push(action.payload);
      }
    },
    removeSavedStory: (state, action) => {
      state.stories = state.stories.filter(story => story.id !== action.payload);
    }
  }
});

export const { addSavedStory, removeSavedStory } = savedSlice.actions;
export default savedSlice.reducer;