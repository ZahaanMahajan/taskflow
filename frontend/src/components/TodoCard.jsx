function TodoCard({ todo, onDelete, onEdit, onStatusChange }) {
  const priority = todo.priority ?? "MEDIUM";

  const status = todo.status ?? "PENDING";

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusLabel = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
  };

  return (
    <article className={`todo-card priority-card-${priority.toLowerCase()}`}>
      <div className="todo-card-top">
        <span className={`priority-badge priority-${priority.toLowerCase()}`}>
          {priority}
        </span>

        <div className="todo-actions">
          <button
            className="icon-button"
            onClick={() => onEdit(todo)}
            title="Edit task"
            aria-label="Edit task"
          >
            ✎
          </button>

          <button
            className="icon-button delete-icon"
            onClick={() => onDelete(todo.id)}
            title="Delete task"
            aria-label="Delete task"
          >
            ×
          </button>
        </div>
      </div>

      <h3 className="todo-title">{todo.title}</h3>

      {todo.description && (
        <p className="todo-description">{todo.description}</p>
      )}

      <div className="todo-card-footer">
        <span className={`status-pill status-${status.toLowerCase()}`}>
          {statusLabel[status] ?? status}
        </span>

        {todo.createdAt && (
          <span className="todo-date">
            Created {formatDate(todo.createdAt)}
          </span>
        )}
      </div>

      <div className="todo-card-status">
        <label htmlFor={`status-${todo.id}`}>Status</label>

        <select
          id={`status-${todo.id}`}
          value={status}
          onChange={(event) => onStatusChange(todo, event.target.value)}
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
    </article>
  );
}

export default TodoCard;
