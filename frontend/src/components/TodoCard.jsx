function TodoCard({ todo, onDelete }) {
  const priority = todo.priority ?? "NORMAL";
  const status = todo.status ?? "PENDING";
  const description = todo.description ?? "";

  return (
    <div className="todo-card">
      <div>
        <h3>{todo.title}</h3>

        <p>{description}</p>

        <div className="todo-meta">
          <span className={`badge priority-${priority.toLowerCase()}`}>
            {priority}
          </span>

          <span className="badge status">{status}</span>
        </div>
      </div>

      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </div>
  );
}

export default TodoCard;
