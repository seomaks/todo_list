import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import Button from "./components/Button";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  todolistId: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  addTask: (todolistId: string, taskID: string) => void
  changeTaskStatus: (todolistId: string, taskID: string, isDone: boolean) => void
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  removeTodoList: (todolistId: string) => void

}

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  let taskJSXElement = props.tasks.map((t) => {
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
      props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked)
    const removeTask = () => props.removeTask(props.todolistId, t.id)
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
  })
  const addTaskToTodoList = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle) {
      props.addTask(props.todolistId, trimmedTitle)
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

  const onAllClickHandlerForRemoveTodoList = () => props.removeTodoList(props.todolistId)

  const onClickHandlerFilter =(value:FilterValuesType) => {
props.changeFilter(props.todolistId, value)
  }

  const allBtnClass = props.filter === "all" ? "active-filter" : ""
  const activeBtnClass = props.filter === "active" ? "active-filter" : ""
  const completedBtnClass = props.filter === "completed" ? "active-filter" : ""

  return <div>
    <div>
    <h3>{props.title}</h3>
    <button onClick={onAllClickHandlerForRemoveTodoList}>x</button></div>
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
      {taskJSXElement}
    </ul>
    <div>

{/*      <button
        className={allBtnClass}
        onClick={()=>onClickHandlerFilter('all')}>All
      </button>
      <button
        className={activeBtnClass}
        onClick={()=>onClickHandlerFilter('active')}>Active
      </button>
      <button
        className={completedBtnClass}
        onClick={()=>onClickHandlerFilter('completed')}>Completed
      </button>*/}

      <Button callBack={()=> onClickHandlerFilter('all')} name={'all'}/>
      <Button callBack={()=> onClickHandlerFilter('active')} name={'active'}/>
      <Button callBack={()=> onClickHandlerFilter('completed')} name={'completed'}/>

    </div>
  </div>
}
