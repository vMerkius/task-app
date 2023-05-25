import React from "react";
import "./App.css";
import Tasks from "./features/tasks/Tasks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleDayTasks from "./features/tasks/SingleDayTasks";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/single-day-tasks/:date" element={<SingleDayTasks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
