import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";



export const todolistsReducer =(state: Array<TodolistType>, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(f => f.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      let newTodolistId = v1()
      return [...state, {id: newTodolistId, title: action.title, filter: 'all'}]
    }
    case 'CHANGE-TODOLIST-TITLE': {
return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
    }
    case 'CHANGE-TODOLIST-FILTER': {
return state.map(m=> m.id === action.id ?  {...m, filter: action.filter} : m)
    }
    default: return state
}
}

type ActionType = RemoveTodolistsACType | AddTodolistsACType | ChangeTodolistsACType | ChangeFilterTodolistACType

type RemoveTodolistsACType = ReturnType<typeof RemoveTodolistAC>

export const RemoveTodolistAC = (id: string) => {
  return {
    type: 'REMOVE-TODOLIST', id
  } as const
}

type AddTodolistsACType = ReturnType<typeof AddTodolistAC>

export const AddTodolistAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST', title
  } as const
}

type ChangeTodolistsACType = ReturnType<typeof ChangeTodolistTitleAC>

export const ChangeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE', id, title
  } as const
}

type ChangeFilterTodolistACType = ReturnType<typeof ChangeFilterTodolistAC>

export const ChangeFilterTodolistAC = (id: string, filter: FilterValuesType) => {
return {
  type: 'CHANGE-TODOLIST-FILTER', id, filter
} as const
}