import { useState } from "react";

function TodoModal({ todo, onUpdate, onClose }) {
  const [title, setTitle] = useState(todo.title ?? "");

  const [description, setDescription] = useState(todo.description ?? "");

  const [priority, setPriority] = useState(todo.priority ?? "MEDIUM");

  const [status, setStatus] = useState(todo.status ?? "PENDING");

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    try {
      setSubmitting(true);

      await onUpdate(todo.id, {
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
      });

      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">TASK #{todo.id}</span>

            <h2>Edit Task</h2>

            <p>Update the task details.</p>
          </div>

          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title">Title</label>

            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Description</label>

            <textarea
              id="edit-description"
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-priority">Priority</label>

              <select
                id="edit-priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="edit-status">Status</label>

              <select
                id="edit-status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="button button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="button button-primary"
              disabled={submitting || !title.trim()}
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoModal;
