import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
  title: 'API'
}

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '0c074aaa-aceb-492d-a73f-9ca4f6d5a703'
  }
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

