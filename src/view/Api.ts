import { TodoType } from "../type";

const BaseUrl = "http://localhost:50001";
const getUrl = (pathname: string): string => new URL(pathname, BaseUrl).toString();

export const Api = {
  list: async (): Promise<TodoType[]> => {
    const response = await fetch(getUrl("/todos"));
    if (response.status !== 200) {
      throw new Error(`Status is not 200: ${response.status}`);
    }
    return await response.json();
  },
  get: async (id: string): Promise<TodoType> => {
    const response = await fetch(getUrl(`/todos/${id}`));
    if (response.status !== 200) {
      throw new Error(`Status is not 200: ${response.status}`);
    }
    return await response.json();
  },
  add: async (title: string): Promise<TodoType> => {
    const response = await fetch(getUrl(`/todos`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (response.status !== 200) {
      throw new Error(`Status is not 200: ${response.status}`);
    }
    return await response.json();
  },
  remove: async (id: string): Promise<void> => {
    const response = await fetch(getUrl(`/todos/${id}`), { method: "DELETE" });
    if (response.status !== 200) {
      throw new Error(`Status is not 200: ${response.status}`);
    }
  },
};
