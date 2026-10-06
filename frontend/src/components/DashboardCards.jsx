function DashboardCards({ todos }) {
  const total = todos.length;

  const completed = todos.filter((todo) => todo.status === "COMPLETED").length;

  const pending = todos.filter((todo) => todo.status !== "COMPLETED").length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total</h3>
        <p>{total}</p>
      </div>

      <div className="stat-card">
        <h3>Completed</h3>
        <p>{completed}</p>
      </div>

      <div className="stat-card">
        <h3>Pending</h3>
        <p>{pending}</p>
      </div>
    </div>
  );
}

export default DashboardCards;
