import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCar,
  deleteCar,
  getAllCars,
  updateCar,
} from "@/services/carService";
import { CarType } from "@/types/carType";
import { refresh } from "@/services/authService";

export const getAllCarsThunk = createAsyncThunk(
  "car/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await getAllCars();
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createCarThunk = createAsyncThunk(
  "car/create",
  async (
    { accessToken, formData }: { accessToken: string; formData: FormData },
    thunkAPI
  ) => {
    try {
      const res = await createCar(accessToken, formData);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          try {
            const res = await createCar(newAccessToken, formData);
            return { data: res.data, accessToken: newAccessToken };
          } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
          }
        }
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCarThunk = createAsyncThunk(
  "car/update",
  async (
    {
      accessToken,
      carId,
      formData,
    }: {
      accessToken: string;
      carId: string;
      formData: FormData;
    },
    thunkAPI
  ) => {
    try {
      const res = await updateCar(accessToken, carId, formData);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          try {
            const res = await updateCar(newAccessToken, carId, formData);
            return { data: res.data, accessToken: newAccessToken };
          } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
          }
        }
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteCarThunk = createAsyncThunk(
  "car/delete",
  async (
    { accessToken, carId }: { accessToken: string; carId: string },
    thunkAPI
  ) => {
    try {
      const res = await deleteCar(accessToken, carId);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          try {
            const res = await deleteCar(newAccessToken, carId);
            return { data: res.data, accessToken: newAccessToken };
          } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
          }
        }
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const carSlice = createSlice({
  name: "car",
  initialState: {
    isLoading: false,
    cars: [],
    accessToken: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCarsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCarsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload;
      })
      .addCase(getAllCarsThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createCarThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCarThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.data.accessToken;
      })
      .addCase(createCarThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCarThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCarThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.data.accessToken;
      })
      .addCase(updateCarThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCarThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCarThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.data.accessToken;
      })
      .addCase(deleteCarThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default carSlice.reducer;
