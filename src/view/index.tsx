import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const reactRootElementId = "react-root";
const domElement = document.getElementById(reactRootElementId);
if (domElement == null) {
  alert(`#${reactRootElementId} element not exists.`);
} else {
  const root = createRoot(domElement);
  root.render(<App />);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept();
}
