import {TasksStateType} from "../App";
import {v1} from "uuid";
import {
  AddTodolistsActionType, RemoveTodolistsActionType,
} from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  taskId: string
  todolistId: string
}
export type AddTaskActionType = {
  type: 'ADD-TASK'
  title: string
  todolistId: string
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskId: string
  isDone: boolean
  todolistId: string
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskId: string
  newTitle: string
  todolistId: string
}

export type ActionsType = RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistsActionType
  | RemoveTodolistsActionType

export const tasksReducer =(state: TasksStateType, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {...state, [action.todolistId]: state[action.todolistId]
          .filter(task => task.id !== action.taskId)}

    case 'ADD-TASK': {
      let newTask = {id: v1(), title: action.title, isDone: false};
      return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]
    }}

    case 'CHANGE-TASK-STATUS': {
      return {...state, [action.todolistId]: state[action.todolistId]
          .map(task => task.id !== action.taskId ? task : {...task, isDone: action.isDone})}
    }

    case 'CHANGE-TASK-TITLE': {
      return {...state, [action.todolistId]: state[action.todolistId]
          .map(task => task.id !== action.taskId ? task : {...task, title: action.newTitle})}
    }

    case 'ADD-TODOLIST': {
      return {
        ...state, [action.todolistId]: []
      }
    }

    case 'REMOVE-TODOLIST': {
      let newState = {...state}
      delete newState[action.id]
      return newState
    }

    default: throw new Error("I don't understand this type")
}
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {
    type: 'REMOVE-TASK', taskId, todolistId
  } as const
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {
    type: 'ADD-TASK', title, todolistId
  } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
  return {
    type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId
  } as const
}


export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId
  } as const
}
