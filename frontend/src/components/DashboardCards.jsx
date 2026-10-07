function DashboardCards({ todos }) {
  const total = todos.length;

  const completed = todos.filter((todo) => todo.status === "COMPLETED").length;

  const inProgress = todos.filter(
    (todo) => todo.status === "IN_PROGRESS",
  ).length;

  const pending = todos.filter((todo) => todo.status === "PENDING").length;

  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="stats-grid">
      <div className="stat-card stat-card-primary">
        <div className="stat-card-header">
          <div className="stat-icon">✓</div>
          <span>Completion Rate</span>
        </div>

        <div className="stat-value">{completionRate}%</div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>

        <p className="stat-description">
          {completed} of {total} tasks completed
        </p>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-icon">◉</div>
          <span>Total Tasks</span>
        </div>

        <div className="stat-value">{total}</div>

        <p className="stat-description">Everything on your task board</p>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-icon">◌</div>
          <span>In Progress</span>
        </div>

        <div className="stat-value">{inProgress}</div>

        <p className="stat-description">Tasks currently being worked on</p>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-icon">○</div>
          <span>Pending</span>
        </div>

        <div className="stat-value">{pending}</div>

        <p className="stat-description">
          {pending === 0 ? "All caught up 🎉" : "Tasks waiting for you"}
        </p>
      </div>
    </div>
  );
}

export default DashboardCards;
