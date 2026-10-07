import { useEffect, useMemo, useState } from "react";

import DashboardCards from "../components/DashboardCards";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TodoModal from "../components/TodoModal";

import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";

function Dashboard() {
  const [todos, setTodos] = useState([]);

  const [search, setSearch] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [editingTodo, setEditingTodo] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadTodos = async () => {
    try {
      setError("");

      const data = await getTodos();

      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load todos:", err);

      setError("Unable to load your tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleCreate = async (todo) => {
    try {
      await createTodo(todo);

      await loadTodos();

      setShowCreateModal(false);
    } catch (err) {
      console.error("Failed to create todo:", err);

      throw err;
    }
  };

  const handleUpdate = async (id, todo) => {
    try {
      await updateTodo(id, todo);

      await loadTodos();

      setEditingTodo(null);
    } catch (err) {
      console.error("Failed to update todo:", err);

      throw err;
    }
  };

  const handleStatusChange = async (todo, status) => {
    try {
      await updateTodo(todo.id, {
        title: todo.title,
        description: todo.description ?? "",
        priority: todo.priority ?? "MEDIUM",
        status,
      });

      await loadTodos();
    } catch (err) {
      console.error("Failed to update todo status:", err);

      await loadTodos();
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTodo(id);

      await loadTodos();
    } catch (err) {
      console.error("Failed to delete todo:", err);

      setError("Unable to delete the task. Please try again.");
    }
  };

  const filteredTodos = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return todos;
    }

    return todos.filter((todo) => {
      const title = todo.title?.toLowerCase() ?? "";

      const description = todo.description?.toLowerCase() ?? "";

      const priority = todo.priority?.toLowerCase() ?? "";

      const status = todo.status?.toLowerCase() ?? "";

      return (
        title.includes(query) ||
        description.includes(query) ||
        priority.includes(query) ||
        status.includes(query)
      );
    });
  }, [todos, search]);

  const currentDate = new Date();

  const month = currentDate.toLocaleDateString("en-US", {
    month: "long",
  });

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-brand">
          <div className="brand-mark">✓</div>

          <div>
            <h1>TaskFlow</h1>
            <span>Personal workspace</span>
          </div>
        </div>

        <div className="topbar-search">
          <span className="search-icon">⌕</span>

          <input
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button className="search-clear" onClick={() => setSearch("")}>
              ×
            </button>
          )}
        </div>

        <div className="topbar-actions">
          <button className="header-icon-button" title="Help">
            ?
          </button>

          <button
            className="header-icon-button notification"
            title="Notifications"
          >
            ♧
            <span />
          </button>
        </div>
      </header>

      <main className="dashboard">
        <section className="workspace-header">
          <div className="workspace-info">
            <div className="workspace-block">
              <span className="workspace-label">{month}</span>

              <span className="workspace-value">{formattedDate}</span>
            </div>

            <div className="workspace-divider" />

            <div className="workspace-block">
              <span className="workspace-label">Board</span>

              <span className="workspace-value">All Tasks</span>
            </div>
          </div>

          <button className="filter-button" onClick={() => setSearch("")}>
            ☰<span>Filter</span>
          </button>

          <button
            className="create-task-button"
            onClick={() => setShowCreateModal(true)}
          >
            <span>+</span>
            Create Task
          </button>
        </section>

        <DashboardCards todos={todos} />

        <section className="board-toolbar">
          <div>
            <h2>
              {filteredTodos.length}{" "}
              {filteredTodos.length === 1 ? "Task" : "Tasks"} shown
            </h2>

            <span>
              {search ? `Search results for "${search}"` : "All Tasks"}
            </span>
          </div>

          {search && (
            <button className="clear-search" onClick={() => setSearch("")}>
              Clear search
            </button>
          )}
        </section>

        {error && (
          <div className="error-banner">
            <span>!</span>
            {error}

            <button onClick={loadTodos}>Retry</button>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading your tasks...</p>
          </div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onDelete={handleDelete}
            onEdit={setEditingTodo}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

      {showCreateModal && (
        <TodoForm
          onCreate={handleCreate}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {editingTodo && (
        <TodoModal
          todo={editingTodo}
          onUpdate={handleUpdate}
          onClose={() => setEditingTodo(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
