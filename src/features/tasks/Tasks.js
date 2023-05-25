import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks, selectTasksByDate } from "./tasksSlice";
import AddTask from "./AddTask";
import TasksList from "./TasksList";
import "./tasks-lists.css";
import Graphs from "./Graphs";
import { Link } from "react-router-dom";

const Tasks = () => {
  const dispatch = useDispatch();
  const [showAdd, setShowAdd] = useState(false);
  const [today, setToday] = useState("");
  const [tomorrow, setTomorrow] = useState("");

  const getTodayOrTomorrow = (wantToday = true) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = currentDate.getDate();
    if (wantToday) day = day < 10 ? "0" + day : day;
    else day = day + 1 < 10 ? "0" + (day + 1) : day + 1;

    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    setToday(getTodayOrTomorrow());
    setTomorrow(getTodayOrTomorrow(false));
    dispatch(loadTasks());
  }, [dispatch]);

  const tasksToday = useSelector((state) => selectTasksByDate(state, today));
  const tasksTomorrow = useSelector((state) =>
    selectTasksByDate(state, tomorrow)
  );

  return (
    <main>
      <section className="task-lists-container">
        <Link to={`/single-day-tasks/${today}`} className="task-link">
          <TasksList tasks={tasksToday} givenDate={today}></TasksList>
        </Link>
        <Link to={`/single-day-tasks/${tomorrow}`} className="task-link">
          <TasksList tasks={tasksTomorrow} givenDate={tomorrow}></TasksList>
        </Link>
      </section>
      <section className="btn-main-page">
        <button
          className="add-btn main-page-btn"
          onClick={() => setShowAdd(!showAdd)}
        >
          Dodaj zadanie
        </button>
        {showAdd && (
          <AddTask showAdd={showAdd} setShowAdd={setShowAdd}></AddTask>
        )}{" "}
      </section>
      <section className="stats">
        <Graphs
          className="task-list"
          tasksToday={tasksToday}
          tasksTomorrow={tasksTomorrow}
        ></Graphs>
      </section>
    </main>
  );
};

export default Tasks;
