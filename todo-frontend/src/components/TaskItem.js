const TaskItem = ({ task }) => {
  return (
    <li className="list-group-item">
      <strong>{task.title}</strong>: {task.description}
    </li>
  );
};

export default TaskItem;
