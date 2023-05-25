import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getData,
  addTaskToApi,
  DeleteTaskFromApi,
  editTaskApi,
} from "../../app/tasksAPI";

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const loadTasks = createAsyncThunk("tasks/load", async () => {
  try {
    const tasks = await getData();
    return tasks;
  } catch (error) {
    throw Error("Could not load tasks from server.");
  }
});

export const addNewTask = createAsyncThunk(
  "tasks/addNewTask",
  async (newTask) => {
    try {
      const response = await addTaskToApi(newTask);
      return response;
    } catch (error) {
      throw Error("Could not add new task");
    }
  }
);
export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (updatedTask) => {
    try {
      const response = await editTaskApi(updatedTask);
      return response;
    } catch (error) {
      throw Error("Could not edit task");
    }
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  try {
    const response = await DeleteTaskFromApi(id);
    return response;
  } catch (error) {
    throw Error("Could not delete task");
  }
});

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    setCompleted: (state, action) => {
      const { id, completed } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.completed = completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = [...state.tasks, action.payload];
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addTask, setCompleted, getTasksByDate } = tasksSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;
export const selectTasksStatus = (state) => state.tasks.status;
export const selectTasksError = (state) => state.tasks.error;
export const selectTasksByDate = (state, date) =>
  state.tasks.tasks.filter((task) => task.date === date);

export default tasksSlice.reducer;
