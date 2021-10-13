import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "Redux", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false}
  ])

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    }
    setTasks([newTask, ...tasks])
  }

  function removeTask(id: string) {
    const filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks)
  }

  const changeTaskStatus = (taskID: string, isDone: boolean) => {
    const updatedTasks = tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
    setTasks(updatedTasks)
  }

//устанавливаем use state
  const [filter, setFilter] = useState<FilterValuesType>("all");
  let tasksForTodolist = tasks;
  //устанавливаем остальные фильтры (активные таски и завершенные)
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }

//написали ф-цию фильтрации
  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  return (
    <div className="App">
      <Todolist title="What to learn"
                tasks={tasksForTodolist}
                filter={filter}
                removeTask={removeTask}
                addTask={addTask}
        //вывели фильтр на страницу
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
