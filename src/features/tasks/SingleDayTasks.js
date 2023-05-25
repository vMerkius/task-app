import React, { useEffect, useState } from "react";
import "./tasks-lists.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, editTask, selectTasksByDate } from "./tasksSlice";
import AddTask from "./AddTask";

const SingleDayTasks = () => {
  const [showAdd, setShowAdd] = useState(false);
  const dispatch = useDispatch();
  const { date } = useParams();
  const tasks = useSelector((state) => selectTasksByDate(state, date));
  const [tasksSorted, setTasksSorted] = useState(() => {
    return tasks.sort((a, b) => {
      const timeA = parseInt(a.startTime.replace(":", ""));
      const timeB = parseInt(b.startTime.replace(":", ""));
      return timeA - timeB;
    });
  });

  const handleTaskClick = (taskId) => {
    const updatedTasks = tasksSorted.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    const taskIndex = tasksSorted.findIndex((task) => task.id === taskId);
    const updatedTask = {
      ...tasksSorted[taskIndex],
      completed: !tasksSorted[taskIndex].completed,
    };
    dispatch(editTask(updatedTask));

    setTasksSorted(
      updatedTasks.sort((a, b) => {
        const timeA = parseInt(a.startTime.replace(":", ""));
        const timeB = parseInt(b.startTime.replace(":", ""));
        return timeA - timeB;
      })
    );
  };
  const handleDelete = (taskId) => {
    const updatedTasks = tasksSorted.filter((task) => {
      return task.id !== taskId;
    });

    dispatch(deleteTask(taskId));

    setTasksSorted(
      updatedTasks.sort((a, b) => {
        const timeA = parseInt(a.startTime.replace(":", ""));
        const timeB = parseInt(b.startTime.replace(":", ""));
        return timeA - timeB;
      })
    );
  };

  return (
    <div className="single-day-container">
      <div className="task-list-single-day">
        <h2>Zadania dnia: {date}</h2>
        {tasksSorted.map((task) => (
          <div key={task.id} className="tasks">
            <ul>
              <li
                className="task"
                // onClick={() => handleTaskClick(task.id)}
                title={task.description}
              >
                <h2>
                  {task.startTime} - {task.endTime}
                </h2>
                <h3
                  onClick={() => handleTaskClick(task.id)}
                  className={task.completed ? "completed" : ""}
                >
                  {task.title}
                </h3>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task.id)}
                >
                  X
                </button>
              </li>
            </ul>
          </div>
        ))}
      </div>
      <div className="button-section">
        <button className="add-btn" onClick={() => setShowAdd(!showAdd)}>
          Dodaj zadanie
        </button>
        {showAdd && (
          <AddTask showAdd={showAdd} setShowAdd={setShowAdd}></AddTask>
        )}
      </div>
    </div>
  );
};

export default SingleDayTasks;
