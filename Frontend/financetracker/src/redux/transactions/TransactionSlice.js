import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "./TransactionService";

const initialState = {
  data: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createTransaction = createAsyncThunk(
  "transaction/create",
  async (transData, thunkApi) => {
    try {
      return await transactionService.create_trans(transData);
    } catch (error) {
      const defaultMessage = "An error occurred. Please try again.";
      let message = defaultMessage;

      if (error.response && error.response.data && error.response.data.msg) {
        message = error.response.data.msg;
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getAllTransaction = createAsyncThunk(
  "transaction/getAll",
  async (_, thunkApi) => {
    try {
      return await transactionService.getall_trans();
    } catch (error) {
      const defaultMessage = "An error occurred. Please try again.";
      let message = defaultMessage;

      if (error.response && error.response.data && error.response.data.msg) {
        message = error.response.data.msg;
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transaction/update",
  async (transData, thunkApi) => {
    try {
      return await transactionService.updatea_trans(transData);
    } catch (error) {
      const defaultMessage = "An error occurred. Please try again.";
      let message = defaultMessage;

      if (error.response && error.response.data && error.response.data.msg) {
        message = error.response.data.msg;
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getATransaction = createAsyncThunk(
  "transaction/getATrans",
  async (transId) => {
    response = await transactionService.geta_trans(`transactions/${transId}/`);
    return response.data;
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllTransaction.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getAllTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.data = action.payload;
      })
      .addCase(getAllTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTransaction.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getATransaction.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getATransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courseArray = action.payload;
      })
      .addCase(getATransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
