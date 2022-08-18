import { TodoType } from "../type";
import { useEffect, useState } from "react";
import { Api } from "./Api";

interface UseTodosState {
  todos: TodoType[];
  add: (title: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const useTodos = (): UseTodosState => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const reloadTodos = async (): Promise<void> => Api.list().then(setTodos);
  useEffect(() => {
    reloadTodos();
  }, []);

  const add = (title: string) => Api.add(title).then((todo) => setTodos((prev) => [todo, ...prev]));
  const remove = (id: string) => Api.remove(id).then(() => setTodos((prev) => prev.filter((t) => t.id !== id)));

  return {
    todos,
    add,
    remove,
  };
};
