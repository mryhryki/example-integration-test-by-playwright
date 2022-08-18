import { generateId, getNowText } from "./utils";
import { TodoType } from "../type";

let StoreOnMemory: TodoType[] = [];

const listTodos = (): TodoType[] => [...StoreOnMemory];
const getTodo = (id: string): TodoType | null => StoreOnMemory.find((todo) => todo.id === id) ?? null;
const addTodo = (title: string): TodoType => {
  const todo: TodoType = { id: generateId(), title, createdAt: getNowText() };
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
