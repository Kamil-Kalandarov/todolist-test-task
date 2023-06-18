import React, { useState } from 'react';
import styles from './app.module.css';
import { ITasks, TTasksTypeValue } from '../types/types';
import TodoList from '../TodoList/TodoList';
import { v1 } from 'uuid';

const App = () => {

  const initialtasks = [
    {id: v1(), text: '1', isDone: true},
    {id: v1(), text: '2', isDone: false},
    {id: v1(), text: '3', isDone: true},
  ]

  const [tasks, setsTasks] = useState<Array<ITasks>>(initialtasks);

  const [tasksType, setTasksType] = useState<TTasksTypeValue>('all');

  let filteredTasks = tasks;

  if(tasksType === 'active') {
    filteredTasks = tasks.filter(task => task.isDone === false)
  };
  if(tasksType === 'complited') {
    filteredTasks = tasks.filter(task => task.isDone === true)
  };

  const changeTasksType = (tasksType: TTasksTypeValue) => {
    setTasksType(tasksType)
  };

  const addNewTask = (inputValue: string) => {
    const newTask = {id: v1(), text: inputValue, isDone: false}
    setsTasks([newTask, ...tasks])
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const task = tasks.find(task => task.id === taskId) 
    if(task) {
      task.isDone = isDone
    }
    setsTasks([...tasks])
  };

  const removeTask = (taskId: string) => {
    const filteredTasks = tasks.filter(task => task.id !== taskId)
    setsTasks(filteredTasks)
  };

  const removeAllComplitedTasks = () => {
    const filteredTasks = tasks.filter(task => !task.isDone)
    setsTasks(filteredTasks)
  }

  return (
    <main className={styles.app}>
      <TodoList 
        tasks={filteredTasks}
        tasksType={tasksType}
        changeTasksType={changeTasksType}
        addNewTask={addNewTask}
        changeTaskStatus={changeTaskStatus}
        removeTask={removeTask}
        removeAllComplitedTasks={removeAllComplitedTasks}
      />
    </main>
  );
};

export default App;
