import * as React from "react";
import { useTodos } from "./useTodos";
import { useState } from "react";

export const App: React.FC = () => {
  const { todos, add, remove } = useTodos();
  const [title, setTitle] = useState("");
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  return (
    <div>
      <h1>App</h1>
      <form
        onSubmit={() => {
          if (title.trim() === "") return;
          add(title).then(() => {
            setTitle("");
            inputRef?.focus();
          });
        }}
      >
        <div>
          <label>
            <div>TODO Title</div>
            <input
              ref={setInputRef}
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              autoFocus={true}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Add TODO" />
        </div>
      </form>
      <ul>
        {todos.map(({ id, title, createdAt }) => (
          <li key={id} id={id}>
            {title} ({createdAt})<button onClick={() => remove(id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
