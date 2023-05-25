import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTask } from "./tasksSlice";

import "./add-task.css";

const AddTask = ({ showAdd, setShowAdd }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [endTime, setEndTime] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title: title,
      description: description,
      date: date,
      startTime: startTime,
      endTime: endTime,
      completed: false,
    };
    dispatch(addNewTask(newTask));
    setTitle("");
    setDescription("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setShowAdd(!showAdd);
  };
  return (
    <section className="add-task-container">
      <form onSubmit={handleSubmit} className="add-task-form">
        <button
          className="delete-btn back-btn"
          type="button"
          onClick={() => {
            setShowAdd(!showAdd);
          }}
        >
          X
        </button>
        <div>
          <label htmlFor="title">Nazwa:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Opis:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label htmlFor="date">Data:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label htmlFor="start-time">Czas rozpoczęcia:</label>
          <input
            type="time"
            id="start-time"
            name="start-time"
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </div>
        <div>
          <label htmlFor="end-time">Czas zakończenia:</label>
          <input
            type="time"
            id="end-time"
            name="end-time"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </div>
        <button className="add-btn add-task-btn" type="submit">
          Dodaj
        </button>
      </form>
    </section>
  );
};

export default AddTask;
