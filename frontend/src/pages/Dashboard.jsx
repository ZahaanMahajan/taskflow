import { useEffect, useState } from "react";

import DashboardCards from "../components/DashboardCards";

import TodoForm from "../components/TodoForm";

import TodoList from "../components/TodoList";

import { getTodos, createTodo, deleteTodo } from "../api/todoApi";

function Dashboard() {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    const data = await getTodos();

    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleCreate = async (todo) => {
    await createTodo(todo);

    loadTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);

    loadTodos();
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="logo">TaskFlow</h1>
      </div>

      <DashboardCards todos={todos} />

      <TodoForm onCreate={handleCreate} />

      <TodoList todos={todos} onDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;
