export interface ITasks {
  id: string
  text: string
  isDone: boolean
};

export type TTasksTypeValue = 'all' | 'active' | 'complited';
