import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Button from "./components/Button";
import {InputWithButton} from "./components/InputWithButton";
import Input from "./components/Input";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolistID: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todolistID: string, taskId: string) => void
  changeFilter: (todolistID: string, value: FilterValuesType) => void
  addTask: (todolistID: string, title: string) => void
  changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
  filter: FilterValuesType
  removeTodolist: (todolistID: string) => void
}

export function Todolist(props: PropsType) {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)
  console.log(title)

  const addTaskHandlerForAddTitle=()=>{
    props.addTask(props.todolistID,title)
  }

  // const addTask = () => {
  //     if (title.trim() !== "") {
  //         props.addTask(props.todolistID, title.trim());
  //         setTitle("");
  //     } else {
  //         setError("Title is required");
  //     }
  // }

  // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //     setTitle(e.currentTarget.value)
  // }

  // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  //     setError(null);
  //     if (e.charCode === 13) {
  //         addTask();
  //     }
  // }
  const onClickHandlerForRemoveTodolist = () => {
    props.removeTodolist(props.todolistID)
  }
  // const onAllClickHandler = () => props.changeFilter(props.todolistID,"all");
  // const onActiveClickHandler = () => props.changeFilter(props.todolistID,"active");
  // const onCompletedClickHandler = () => props.changeFilter(props.todolistID,"completed");
  const tsarFoo = (value: FilterValuesType) => {
    props.changeFilter(props.todolistID, value)
  }
  const onClickHandlerForRemove = (Tid: string) => {
    props.removeTask(props.todolistID, Tid)
  }

  const addTaskHandlerForEnter=()=>{
    props.addTask(props.todolistID, title)
  }

  return <div>
    <h3>{props.title}</h3>
    {/*<button onClick={onClickHandlerForRemoveTodolist}>x</button>*/}
    <Button callBack={onClickHandlerForRemoveTodolist} name={'x'}/>
    {/*<div>*/}
    {/*    <input value={title}*/}
    {/*           onChange={onChangeHandler}*/}
    {/*           onKeyPress={onKeyPressHandler}*/}
    {/*           className={error ? "error" : ""}*/}
    {/*    />*/}
    {/*    <button onClick={addTask}>+</button>*/}
    {/*    {error && <div className="error-message">{error}</div>}*/}
    {/*</div>*/}

    {/*<InputWithButton addTask={props.addTask} todolistID={props.todolistID}/>*/}

    <Input title={title} setTitle={setTitle} addTask={addTaskHandlerForEnter}/>
    <Button callBack={addTaskHandlerForAddTitle} name={'+'}/>
    <ul>
      {
        props.tasks.map(t => {
          // const onClickHandler = () => props.removeTask(props.todolistID,t.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
          }

          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={t.isDone}/>
            <span>{t.title}</span>
            {/*<button onClick={onClickHandler}>x</button>*/}
            {/*<Button callBack={onClickHandler} name={'x'}/>*/}
            <Button callBack={() => onClickHandlerForRemove(t.id)} name={'x'}/>

          </li>
        })
      }
    </ul>
    <div>
      {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
      {/*        onClick={onAllClickHandler}>All</button>*/}
      {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
      {/*    onClick={onActiveClickHandler}>Active</button>*/}
      {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
      {/*    onClick={onCompletedClickHandler}>Completed</button>*/}

      {/*<button className={props.filter === 'all' ? "active-filter" : ""} onClick={()=>tsarFoo('all')}>All</button>*/}
      {/*<button className={props.filter === 'active' ? "active-filter" : ""} onClick={()=>tsarFoo('active')}>Active</button>*/}
      {/*<button className={props.filter === 'completed' ? "active-filter" : ""} onClick={()=>tsarFoo('completed')}>Completed</button>*/}

      <Button callBack={() => tsarFoo('all')} name={'all'} filter={props.filter}/>
      <Button callBack={() => tsarFoo('active')} name={'active'} filter={props.filter}/>
      <Button callBack={() => tsarFoo('completed')} name={'completed'} filter={props.filter}/>

    </div>
  </div>
}
