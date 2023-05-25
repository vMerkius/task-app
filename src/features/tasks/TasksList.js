import React, { useEffect, useState } from "react";
import "./tasks-lists.css";

const TasksList = ({ tasks, givenDate }) => {
  const [tasksSorted, setTasksSorted] = useState([]);

  // const dispatch = useDispatch();

  useEffect(() => {
    setTasksSorted(
      tasks.sort((a, b) => {
        const timeA = parseInt(a.startTime.replace(":", ""));
        const timeB = parseInt(b.startTime.replace(":", ""));
        return timeA - timeB;
      })
    );
  }, [tasks]);

  return (
    <div className="task-list">
      <h2>Zadania dnia: {givenDate}</h2>
      {tasksSorted.map((task) => (
        <div key={task.id} className="tasks">
          <ul>
            <li className="task">
              <h2>
                {task.startTime} - {task.endTime}
              </h2>
              <h3 className={task.completed ? "completed" : ""}>
                {task.title}
              </h3>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
