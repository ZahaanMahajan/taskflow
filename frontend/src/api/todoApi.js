import axios from "axios";

const API_URL = "/api/todos";

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
