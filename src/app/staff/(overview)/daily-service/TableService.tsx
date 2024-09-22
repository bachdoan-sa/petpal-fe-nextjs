'use client'
import React, { useState } from "react";

function TaskTable() {
  const initialTasks = [
    { id: 1, task: "Task 1", completed: false },
    { id: 2, task: "Task 2", completed: false },
    { id: 3, task: "Task 3", completed: false },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const handleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-4">
      <h2>Danh sách service</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" style={{ width: "70%" }}>Service </th>
            <th scope="col" style={{ width: "30%" }} className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.task}</td>
              <td className="text-center">
                <button
                  className={`btn ${task.completed ? "btn-secondary" : "btn-primary"}`}
                  onClick={() => handleComplete(task.id)}
                  disabled={task.completed}
                >
                  {task.completed ? "Đã hoàn thành" : "Hoàn thành"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
