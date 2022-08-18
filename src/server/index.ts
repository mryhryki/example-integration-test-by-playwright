import express from "express";
import bodyParser from "body-parser";
import { Todo } from "./store";

export const ServerPort = 50001;

const app = express();
app.use(bodyParser.json());
app.use((req, _, next) => {
  // Simple request logger
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get("/todos", (_, res) => res.json(Todo.list()));
app.get("/todos/:id", (req, res) => res.json(Todo.get(req.params.id)));
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).send("title param is required");
  }
  res.json(Todo.add(title));
});
app.delete("/todos/:id", (req, res) => {
  Todo.delete(req.params.id);
  res.status(200).send();
});

app.listen(ServerPort, () => console.log(`=== http://localhost:${ServerPort} ===`));
