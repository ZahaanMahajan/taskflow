import { useState } from "react";

function TodoForm({ onCreate }) {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      title,
      description,
      priority: "MEDIUM",
      status: "PENDING",
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        placeholder="Todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;
