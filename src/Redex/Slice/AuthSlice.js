import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users?email=${user.email}`
      );

      if (response.data.length == 0) {
        throw new Error("Invalid credintials");
      }
      if (response.data[0].password !== user.password)
        throw new Error("Invalid credintials");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/users", user);
      console.log(response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
