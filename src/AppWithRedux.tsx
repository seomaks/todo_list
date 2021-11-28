import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";
import {
  addTaskAC,
  changeTaskStatusAC, changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import {
  addTodolistAC,
  changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithRedux() {
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistId: string) => {
    dispatch(removeTaskAC(id, todolistId))
  }, [dispatch])

  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId))
  },[dispatch])

  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC(todolistId, value))
  }, [dispatch])

  const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC(id, isDone, todolistId))
  }, [dispatch])

  const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(id, newTitle, todolistId))
  }, [dispatch])

  const removeTodolist = useCallback((id: string) => {
    const action = removeTodolistAC(id)
    dispatch(action)
  },[dispatch])

  const changeTodolistTitle = useCallback((id: string, title: string) => {
    dispatch(changeTodolistTitleAC(id, title))
  }, [dispatch])

  const addTodolist = useCallback( (title: string) => {
    const action = addTodolistAC(title)
    dispatch(action)
  }, [dispatch])

  return (
    <div className="App">

      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container fixed>
        <Grid container style={{padding: '20px'}}><AddItemForm
          addItem={addTodolist}/></Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              return <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
