import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './todoList.module.css';
import { ITasks,  TTasksTypeValue } from '../types/types';
import Tabs from '../Tabs/Tabs';

interface ITodoListProps {
  tasks: Array<ITasks>
  tasksType: TTasksTypeValue
  changeTasksType: (tasksType: TTasksTypeValue) => void
  addNewTask: (inputValue: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  removeTask: (taskId: string) => void
  removeAllComplitedTasks: () => void
};

const TodoList = ({ 
  tasks, 
  tasksType, 
  changeTasksType, 
  addNewTask, 
  changeTaskStatus, 
  removeTask, 
  removeAllComplitedTasks 
}: ITodoListProps) => {

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null)
  
  const leftActiveTasksCount = tasks.filter(task => task.isDone === false);
  const leftComplitedTasksCount = tasks.filter(task => task.isDone === true);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    setError(null)
  };

  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.charCode === 13 && inputValue.trim() !== '') {
      addNewTask(inputValue)
      setInputValue('')
    }
    if(inputValue === '') {
      setError('can not be empty')
    }
  };

  const onAddButton = () => {
    if(inputValue.trim() !== '') {
      addNewTask(inputValue.trim())
      setInputValue('')
    } else {
      setError('can not be empty')
    };
  };

  const onRemoveComplited = () => {
    removeAllComplitedTasks()
  };


  return (
    <div className={styles.todoList}>
      <h1 className={styles.todoList__title}>Todos</h1>
      <div className={styles.todoList__container}>
        <div className={styles.todoList__submitContainer}>
          <div className={styles.todoList__inputContainer}>
            <input 
              id={'name'}
              name={'name'}
              className={error ? styles.todoList__input_error : styles.todoList__input} 
              placeholder={'enter your task'} 
              value={inputValue} 
              onChange={onChangeInput} 
              onKeyPress={onPressEnter}
              autoComplete='off'
            />
            <label htmlFor={'name'} className={styles.todoList__inputLabel}>enter your task</label>
          </div>
          <button className={styles.todoList__addTaskBtn} onClick={onAddButton}>Add</button>
        </div>
        {error ? <span className={styles.todoList__errorMessage}>{error}</span> : null}
        <ul className={styles.todoList__list}>
          {tasks.map(task => {
            const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
              changeTaskStatus(task.id, e.currentTarget.checked)
            }
            return (
              <li className={styles.todoList__item} key={task.id}>
                <div className={styles.todoList__task}>
                  <input 
                    className={styles.todoList__checkbox} 
                    type='checkbox' 
                    checked={task.isDone} 
                    onChange={onChangeCheckbox} 
                  />
                  <span className={task.isDone ? styles.todoList__taskText_complited : styles.todoList__taskText}>{task.text}</span>
                </div>
                <button className={styles.todoList__removeTaskBtn} onClick={() => removeTask(task.id)}></button>
              </li>
            )
           })}
        </ul>
        <div className={styles.todoList__footer}>
          {tasksType === 'complited' 
            ? <p>{leftComplitedTasksCount.length} complited items</p> 
            : <p>{leftActiveTasksCount.length} items left</p>
          }
          <Tabs tasksType={tasksType} changeTasksType={changeTasksType} />
          <button className={styles.todoList__removeCompletedBtn} onClick={onRemoveComplited}>Clear complited</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
