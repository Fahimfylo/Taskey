import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";

const TasksContext = createContext();

const serverUrl =
  process.env.REACT_APP_SERVER_URL || "http://localhost:8000/api/v1";

export const TaskProvider = ({ children }) => {
  const userId = useUserContext().user._id;
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [priority, setPriority] = React.useState("all");
  const [activeTask, setActiveTask] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("");
  const [profileModal, setProfileModal] = React.useState(false);

  const openModalAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask({
      title: "",
      description: "",
      priority: "low",
      dueDate: "",
    });
  };

  const openModalEdit = (task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
  };

  const openProfileModal = () => {
    setProfileModal(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask({
      title: "",
      description: "",
      priority: "low",
      dueDate: "",
    });
  };

  // Get all tasks
  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/tasks`);
      setTasks(response.data.tasks);
    } catch (error) {
    }
    setLoading(false);
  };

  // Get a single task
  const getTask = async (taskId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/task/${taskId}`);
      setTask(response.data);
    } catch (error) {
      console.error("Error getting task:", error);
    }
    setLoading(false);
  };

  // Create a new task
  const createTask = async (task) => {
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/task/create`, task);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTask({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
        completed: false,
      }); // Reset form fields
      toast.success("Task Created Successfully");
    } catch (error) {
      console.log("Error creating task", error);
    }
    setLoading(false);
  };

  // Update a task
  const updateTask = async (task) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${serverUrl}/task/${task._id}`, task);

      const newTasks = tasks.map((tsk) => {
        return tsk._id === response.data._id ? response.data : tsk;
      });
      toast.success("Task updated successfully");
      setTasks(newTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/task/${taskId}`);

      const newTasks = tasks.filter((tsk) => tsk._id !== taskId);
      setTasks(newTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    setLoading(false);
  };

  // Handle input changes dynamically

  const handleInput = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const activeTasks = tasks.filter((task) => !task.completed);

  useEffect(() => {
    getTasks();
  }, [userId]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        task,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        priority,
        setPriority,
        handleInput,
        isEditing,
        setIsEditing,
        openModalAdd,
        openModalEdit,
        activeTask,
        closeModal,
        modalMode,
        completedTasks,
        activeTasks,
        profileModal,
        openProfileModal
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return React.useContext(TasksContext);
};
