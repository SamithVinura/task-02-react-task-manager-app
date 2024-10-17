import axios from "axios";

const baseUrl = "http://localhost:5000";

//user login
export const login = async (userName, password) => {
  try {
    const allUsers = await axios.get(`${baseUrl}/users`);
    const userValid = allUsers.data.filter(
      (user) => user?.userName === userName && user?.password === password
    );
    return userValid[0];
  } catch (error) {
    throw error;
  }
};

//get task list
export const getTasksList = async () => {
  try {
    const allTasks = await axios.get(`${baseUrl}/tasks`);
    return allTasks.data;
  } catch (error) {
    throw error;
  }
};

// Create a new task
export const createTask = async (newTask) => {
  try {
    const response = await axios.post(`${baseUrl}/tasks`, newTask);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//edit task
export const updateTask = async (taskId, updatedTaskData) => {
  try {
    const response = await axios.put(
      `${baseUrl}/tasks/${taskId}`,
      updatedTaskData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete task by id
export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${baseUrl}/tasks/${taskId}`);
    return `Task ${taskId} deleted successfully`;
  } catch (error) {
    throw error;
  }
};
