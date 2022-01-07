import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
  title: 'API'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    todolistAPI.getTodolists()
      .then((res) => {
        setState(res.data);
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const title = 'SEO seo SEO'
    todolistAPI.createTodolist(title)
      .then( (res) => {
      setState(res.data);
    } )
  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '21e51988-8755-466c-836a-b2042ab39795';
    todolistAPI.deleteTodolist(todolistId)
      .then( (res) => {
      setState(res.data);
    })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '24281a76-4b79-4ca6-b1cd-648b37cde0f9'
    todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
      .then((res) => {

        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'ace1a6b7-5e2a-4e94-a808-2cd2d26ba3a3'
    todolistAPI.getTasks(todolistId)
      .then((res) => {
        setState(res.data);
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '';
    const taskId = '';
    todolistAPI.deleteTask(todolistId, taskId)
      .then( (res) => {
        setState(res.data);
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}