import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../services/userService";
import { refresh } from "@/services/authService";

export const getUserThunk = createAsyncThunk(
  "user/get",
  async (accessToken: string, thunkAPI) => {
    try {
      const res = await getUser(accessToken);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await getUser(newAccessToken);
              return { data: res.data, accessToken: newAccessToken };
            } catch (error: any) {
              return thunkAPI.rejectWithValue(error.response.data.message);
            }
          }
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { isLoading: false, user: {}, error: null, accessToken: "" },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(getUserThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
