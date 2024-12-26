import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import { fetchTasks } from "../services/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    getTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <ul className="list-group mt-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
