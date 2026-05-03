import { useState } from "react";
import './InputTask.css';

function InputTask({ addTask }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Yet to Start");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = () => {
    if (!title.trim()) return;
    addTask({ title, description, startDate, dueDate, status, priority });
    setTitle(""); setDescription(""); setStartDate("");
    setDueDate(""); setStatus("Yet to Start"); setPriority("Medium");
    setOpen(false);
  };

  return (
    <div className="input-wrapper">
      {!open ? (
        <button className="add-task-trigger" onClick={() => setOpen(true)}>
          + Add New Task
        </button>
      ) : (
        <div className="input-container">
          <h3 className="form-title">New Task</h3>
          <div className="form-grid">
            <input className="form-input span-2" type="text" placeholder="Task title *"
              value={title} onChange={e => setTitle(e.target.value)} />
            <input className="form-input span-2" type="text" placeholder="Description"
              value={description} onChange={e => setDescription(e.target.value)} />
            <div className="form-group">
              <label>Start Date</label>
              <input className="form-input" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input className="form-input" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select className="form-input" value={status} onChange={e => setStatus(e.target.value)}>
                <option>Yet to Start</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select className="form-input" value={priority} onChange={e => setPriority(e.target.value)}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-cancel" onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn-submit" onClick={handleSubmit}>Add Task</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default InputTask;
