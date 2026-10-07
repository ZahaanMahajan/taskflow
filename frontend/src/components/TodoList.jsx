import TodoCard from "./TodoCard";

const columns = [
  {
    status: "PENDING",
    title: "To-Do List",
    subtitle: "Tasks waiting to be started",
  },
  {
    status: "IN_PROGRESS",
    title: "In Progress",
    subtitle: "Tasks currently being worked on",
  },
  {
    status: "COMPLETED",
    title: "Done",
    subtitle: "Completed tasks",
  },
];

function TodoList({ todos, onDelete, onEdit, onStatusChange }) {
  return (
    <div className="board">
      {columns.map((column) => {
        const columnTodos = todos.filter(
          (todo) => todo.status === column.status,
        );

        return (
          <section className="board-column" key={column.status}>
            <div className="column-header">
              <div>
                <div className="column-title-row">
                  <span className="column-icon">
                    {column.status === "PENDING" && "☷"}
                    {column.status === "IN_PROGRESS" && "◴"}
                    {column.status === "COMPLETED" && "✓"}
                  </span>

                  <h2>{column.title}</h2>

                  <span className="column-count">{columnTodos.length}</span>
                </div>

                <p>{column.subtitle}</p>
              </div>

              <span className="column-menu">⋮</span>
            </div>

            <div className="column-content">
              {columnTodos.length === 0 ? (
                <div className="column-empty">
                  <span>✓</span>
                  <p>No tasks here</p>
                </div>
              ) : (
                columnTodos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onStatusChange={onStatusChange}
                  />
                ))
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default TodoList;
