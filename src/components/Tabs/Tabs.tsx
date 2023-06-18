import styles from './tabs.module.css';
import { TTasksTypeValue } from '../types/types';
import { MouseEventHandler } from 'react';

interface ITabProps {
  tasksType: TTasksTypeValue
  changeTasksType: (tasksType: TTasksTypeValue) => void
};

const Tabs = ({ tasksType, changeTasksType }: ITabProps) => {

  return (
    <nav className={styles.todoList__tabs}>
      <button 
        className={tasksType === 'all' ? styles.todoList__tab_active : styles.todoList__tab} 
        children={ 'All' } 
        onClick={() => changeTasksType('all')} 
      />
      <button 
        className={tasksType === 'active' ? styles.todoList__tab_active : styles.todoList__tab} 
        children={ 'Active' } 
        onClick={() => changeTasksType('active')} 
      />
      <button 
        className={tasksType === 'complited' ? styles.todoList__tab_active : styles.todoList__tab} 
        children={ 'Complited' } 
        onClick={() => changeTasksType('complited')} 
      />
    </nav>
  );
};

export default Tabs;
