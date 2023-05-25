import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const SingleGraph = ({ allTasks, toDoTasks, tasksDoneAll, tasksToDoAll }) => {
  const doneTasks = allTasks - toDoTasks;
  const data = {
    labels: ["Zadania zrobione dzisiaj", "Zadania do zrobienia dzisiaj"],
    datasets: [
      {
        data: [doneTasks, toDoTasks],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const data_2 = {
    labels: ["Wszystkie zadania zrobione", "Zadania do zrobienia"],
    datasets: [
      {
        data: [tasksDoneAll, tasksToDoAll],
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: ["rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="graphs">
      <div style={{ width: "300px", height: "300px" }}>
        {allTasks > 0 && toDoTasks > 0 && <Pie data={data} />}
      </div>
      <div style={{ width: "300px", height: "300px" }}>
        {tasksDoneAll > 0 && tasksToDoAll > 0 && <Pie data={data_2} />}
      </div>
    </div>
  );
};

export default SingleGraph;
