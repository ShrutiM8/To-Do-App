import { useEffect, useState } from 'react';
import './TaskCard.css';

const PRIORITY_COLOR = { High: "#EF4444", Medium: "#F59E0B", Low: "#22C55E" };
const STATUS_CLASS = {
  "Yet to Start": "yet-to-start",
  "Pending": "pending",
  "In Progress": "in-progress",
  "Completed": "completed"
};

function isOverdue(task) {
  if (!task.dueDate || task.status === "Completed") return false;
  return new Date(task.dueDate) < new Date(new Date().toDateString());
}

function TaskCard({ task, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => { setEditedTask(task); }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const saveTask = () => {
    if (!editedTask.title.trim()) return;
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  const overdue = isOverdue(task);

  return (
    <div className={`task-card ${overdue ? "overdue" : ""} ${task.status === "Completed" ? "done" : ""}`}>
      {isEditing ? (
        <div className="edit-form">
          <input className="edit-input" type="text" name="title"
            value={editedTask.title} onChange={handleChange} placeholder="Task title" />
          <input className="edit-input" type="text" name="description"
            value={editedTask.description} onChange={handleChange} placeholder="Description" />
          <div className="edit-row">
            <div className="edit-group">
              <label>Start Date</label>
              <input className="edit-input" type="date" name="startDate"
                value={editedTask.startDate} onChange={handleChange} />
            </div>
            <div className="edit-group">
              <label>Due Date</label>
              <input className="edit-input" type="date" name="dueDate"
                value={editedTask.dueDate} onChange={handleChange} />
            </div>
          </div>
          <div className="edit-row">
            <div className="edit-group">
              <label>Status</label>
              <select className="edit-input" name="status" value={editedTask.status} onChange={handleChange}>
                <option>Yet to Start</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="edit-group">
              <label>Priority</label>
              <select className="edit-input" name="priority" value={editedTask.priority || "Medium"} onChange={handleChange}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div className="edit-actions">
            <button className="btn-save" onClick={saveTask}>Save</button>
            <button className="btn-cancel-sm" onClick={() => { setEditedTask(task); setIsEditing(false); }}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="card-header">
            <div className="card-title-row">
              <h3 className={`task-title ${task.status === "Completed" ? "strikethrough" : ""}`}>{task.title}</h3>
              {task.priority && (
                <span className="priority-badge" style={{ color: PRIORITY_COLOR[task.priority], background: PRIORITY_COLOR[task.priority] + "18" }}>
                  {task.priority}
                </span>
              )}
            </div>
            {overdue && <span className="overdue-badge">⚠ Overdue</span>}
          </div>
          {task.description && <p className="task-desc">{task.description}</p>}
          <div className="task-dates">
            {task.startDate && <span>📅 Start: {task.startDate}</span>}
            {task.dueDate && <span className={overdue ? "date-overdue" : ""}>🗓 Due: {task.dueDate}</span>}
          </div>
          <div className="card-footer">
            <span className={`status-badge ${STATUS_CLASS[task.status] || "pending"}`}>{task.status}</span>
            <div className="task-actions">
              <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="btn-delete" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default TaskCard;
