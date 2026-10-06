import TodoCard from "./TodoCard";

function TodoList({ todos, onDelete }) {
  if (!todos.length) {
    return (
      <div className="empty-state">No todos yet. Create your first task.</div>
    );
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TodoList;
