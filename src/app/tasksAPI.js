import axios from "axios";
// const URL = "http://localhost:8000/tasks";
const URL = "https://befitting-tartan-cause.glitch.me/tasks";
export const getData = () => {
  return axios
    .get(`${URL}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

export const addTaskToApi = (newTask) => {
  return axios
    .post(`${URL}`, newTask)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export const editTaskApi = (updatedTask) => {
  return axios
    .put(`${URL}/${updatedTask.id}`, updatedTask)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const DeleteTaskFromApi = (idTask) => {
  return axios
    .delete(`${URL}/${idTask}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
