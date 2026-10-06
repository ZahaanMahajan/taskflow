function TodoCard({ todo, onDelete }) {
  return (
    <div className="todo-card">
      <div>
        <h3>{todo.title}</h3>

        <p>{todo.description}</p>

        <div className="todo-meta">
          <span className={`badge priority-${todo.priority.toLowerCase()}`}>
            {todo.priority}
          </span>

          <span className="badge status">{todo.status}</span>
        </div>
      </div>

      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </div>
  );
}

export default TodoCard;
