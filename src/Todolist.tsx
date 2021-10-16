import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  //filter: FilterValuesType
  addTask: (taskID: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean) => void
  removeTask: (taskId: string) => void
  //указали тип фильтра: функция, которая не возвращает данные
  //changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const addTaskToTodoList = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle) {
      props.addTask(trimmedTitle)
      setTitle("")
    } else {
      setError(true)
    }
  }

  const onKeyPressAddTaskToTodoList = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskToTodoList()
    }
  }
  const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }

  const onAllClickHandler = () => changeFilter("all")
  const onActiveClickHandler = () => changeFilter("active")
  const onCompleteClickHandler = () => changeFilter("completed")

  const [filter, setFilter] = useState<FilterValuesType>("all");
  let tasksForTodolist = props.tasks;
  if (filter === "active") {
    tasksForTodolist = props.tasks.filter(t => t.isDone === false);
  }
  if (filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.isDone === true);
  }

  const allBtnClass = filter === "all" ? "active-filter" : ""
  const activeBtnClass = filter === "active" ? "active-filter" : ""
  const completedBtnClass = filter === "completed" ? "active-filter" : ""

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  return <div>

    <h3>{props.title}</h3>
    <div>
      <input
        placeholder={"Give me a task please"}
        value={title}
        onChange={onChangeSetTitle}
        onKeyPress={onKeyPressAddTaskToTodoList}
        className={error ? "error" : ""}
      />
      <button onClick={addTaskToTodoList}>+</button>
      {error && <p style={{margin: "5px 0", color: "red"}}>Title is required!</p>}
    </div>
    <ul>
      {tasksForTodolist.map((t) => {
      const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
      props.changeTaskStatus(t.id, e.currentTarget.checked)
      const removeTask = () => props.removeTask(t.id)
      return <li
      key={t.id}
      className={t.isDone ? "done" : ""}
      >
      <input type="checkbox"
      checked={t.isDone}
      onChange={changeTaskStatus}
      />
      <span>{t.title}</span>
      <button onClick={removeTask}>x
      </button>
      </li>
    })}
    </ul>
    <div>
      <button
        className={allBtnClass}
        onClick={onAllClickHandler}>All
      </button>
      <button
        className={activeBtnClass}
        onClick={onActiveClickHandler}>Active
      </button>
      <button
        className={completedBtnClass}
        onClick={onCompleteClickHandler}>Completed
      </button>
    </div>
  </div>
}
