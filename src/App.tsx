import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

type TasksType = {[key: string]: Array<TaskType>}

type todolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<todolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'}
  ])

  const [tasks, setTasks] = useState<TasksType>({
    [todolistID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "Redux", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false}
    ],
    [todolistID2]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "Redux", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false}
    ]
  });

  const addTask = (todolistId: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: [{
        id: v1(),
        title: title,
        isDone: false
      }, ...tasks[todolistId]]
    })
  }

  function removeTask(todolistId: string, id: string) {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter(f => f.id !== id)
    })
  }

  const removeTodoList = (todolistId: string) => {
    setTodolists(todolists.filter(f => f.id !== todolistId))}

  const changeTaskStatus = (todolistId: string, taskID: string, isDone: boolean) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(m => m.id === taskID ? {
        ...m,
        isDone: isDone
      } : m)
    })
  }


  function changeFilter(todolistId: string, value: FilterValuesType) {
    setTodolists(todolists.map(m => m.id === todolistId ? {
      ...m,
      filter: value
    } : m))
  }


  return (
    <div className="App">

      {todolists.map(m => {

        let tasksForTodolist = tasks[m.id];

        if (m.filter === "active") {
          tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
        }
        if (m.filter === "completed") {
          tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
        }

        return (
          <Todolist
            key={m.id}
            todolistId={m.id}
            title={m.title}
            tasks={tasksForTodolist}
            filter={m.filter}
            removeTask={removeTask}
            addTask={addTask}
            changeFilter={changeFilter}
            changeTaskStatus={changeTaskStatus}
            removeTodoList={removeTodoList}
          />
        )
      })}


    </div>
  );
}

export default App;
