import { generateId, getNowText } from "./utils";

export interface Todo {
  id: string;
  title: string;
  createdAt: string;
}

let StoreOnMemory: Todo[] = [];

const listTodos = (): Todo[] => [...StoreOnMemory];
const getTodo = (id: string): Todo | null => StoreOnMemory.find((todo) => todo.id === id) ?? null;
const addTodo = (title: string): Todo => {
  const todo: Todo = { id: generateId(), title, createdAt: getNowText() };
  StoreOnMemory = [todo, ...StoreOnMemory];
  return todo;
};
const deleteTodo = (id: string): void => {
  StoreOnMemory = StoreOnMemory.filter((todo) => todo.id !== id);
};

export const Todo = {
  list: listTodos,
  get: getTodo,
  add: addTodo,
  delete: deleteTodo,
};
