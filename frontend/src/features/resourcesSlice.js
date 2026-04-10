import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchResources = createAsyncThunk('resources/fetchResources', async () => {
  const response = await axios.get('/api/resources');
  return response.data;
});

export const createResource = createAsyncThunk('resources/createResource', async (resource) => {
  const response = await axios.post('/api/resources', resource);
  return response.data;
});

const resourcesSlice = createSlice({
  name: 'resources',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createResource.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export default resourcesSlice.reducer;