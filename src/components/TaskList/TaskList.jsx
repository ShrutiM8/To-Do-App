import TaskCard from "../TaskCard/TaskCard";
import './TaskList.css';

function TaskList({ tasks, deleteTask, updateTask }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <div className="empty-title">No tasks found</div>
          <div className="empty-sub">Add a new task or adjust your filters</div>
        </div>
      ) : (
        tasks.map(task => (
          <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
        ))
      )}
    </div>
  );
}
export default TaskList;
