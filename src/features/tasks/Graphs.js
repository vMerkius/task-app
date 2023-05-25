import { useSelector } from "react-redux";
import SingleGraph from "./SingleGraph";
import { selectTasks } from "./tasksSlice";

const Graphs = ({ tasksToday, tasksTomorrow }) => {
  const allTasksToday = tasksToday.length;
  const allTasksTomorrow = tasksTomorrow.length;
  const tasks = useSelector(selectTasks);
  const tasksDoneAll = tasks.reduce((acc, task) => {
    if (task.completed) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const tasksToDoAll = tasks.length - tasksDoneAll;
  console.log(tasksToDoAll);
  console.log(tasksDoneAll);
  const tasksToDoToday = tasksToday.reduce((acc, task) => {
    if (!task.completed) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  const doneTasksToday = allTasksToday - tasksToDoToday;
  return (
    <div className="stats-container">
      <div className="stats-w">
        <span className="stats-w-section-first">
          <span>
            <h1>Zadania do zrobienia dziś: {tasksToDoToday}</h1>
            <h1>Zadania zrobione dziś: {doneTasksToday}</h1>
          </span>
          <span>
            <h1>Zadania jutro: {allTasksTomorrow}</h1>
          </span>
        </span>

        <span className="stats-w-section-second">
          <h1>Wszystkie zrobione zadania:{tasksDoneAll}</h1>
          <h1>Wszystkie zadania do zrobienia:{tasksToDoAll}</h1>
        </span>
      </div>
      <SingleGraph
        allTasks={allTasksToday}
        toDoTasks={tasksToDoToday}
        tasksDoneAll={tasksDoneAll}
        tasksToDoAll={tasksToDoAll}
      ></SingleGraph>
    </div>
  );
};

export default Graphs;
