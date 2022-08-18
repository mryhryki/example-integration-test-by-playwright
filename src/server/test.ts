// =============================================
// Needs to run server before invoke this script
// =============================================

import fetch from "node-fetch";

const BaseUrl = `http://127.0.0.1:50001`;
const getUrl = (pathname: string) => new URL(pathname, BaseUrl).toString();

const assert = (subject: string, expect: unknown, actual: unknown): void => {
  if (JSON.stringify(expect) === JSON.stringify(actual)) {
    console.log(`[OK] ${subject}`);
    return;
  }
  console.log(`[NG] ${subject}`);
  console.error(`[Expected]\n${JSON.stringify(expect, null, 2)}`);
  console.error(`[Actual]\n${JSON.stringify(actual, null, 2)}`);
  throw new Error("Assertion Error");
};

const test = async (): Promise<void> => {
  const listResponse = await fetch(getUrl("/todos"), { method: "GET" });
  assert("GET /todos response status", 200, listResponse.status);
  assert("GET /todos response data", [], await listResponse.json());

  const title = "TEST TODO 1";
  const addResponse = await fetch(getUrl("/todos"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title }),
  });
  assert("POST /todos response status", 200, addResponse.status);
  const addedTodo: any = await addResponse.json();
  assert("POST /todos response data", title, addedTodo.title);

  const resourcePath = `/todos/${addedTodo.id}`;
  const getResponse = await fetch(getUrl(resourcePath), { method: "GET" });
  assert(`GET ${resourcePath} response status`, 200, getResponse.status);
  assert(`GET ${resourcePath} response data`, addedTodo, await getResponse.json());

  const listResponse2 = await fetch(getUrl("/todos"), { method: "GET" });
  assert("GET /todos response status", 200, listResponse2.status);
  assert("GET /todos response data", [addedTodo], await listResponse2.json());

  const deleteResponse = await fetch(getUrl(resourcePath), { method: "DELETE" });
  assert("DELETE /todos response status", 200, deleteResponse.status);

  const listResponse3 = await fetch(getUrl("/todos"), { method: "GET" });
  assert("GET /todos response status", 200, listResponse3.status);
  assert("GET /todos response data", [], await listResponse3.json());
};

console.log("==============");
test()
  .then(() => {
    console.log("==============");
    console.log("FINISHED");
  })
  .catch((err) => {
    console.log("==============");
    console.error("ERROR");
    console.error(err);
  });
