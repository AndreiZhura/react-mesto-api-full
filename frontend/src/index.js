import React from "react";
import ReactDOM from "react-dom/client";
import "./pages/index.css";
import App from "./components/App.js";
import { BrowserRouter } from "react-router-dom"; // импортируем BrowserRouter

/*Компонент BrowserRouter отслеживает историю навигации в процессе работы React Router.
 Когда пользователь переходит назад или вперёд в браузере, BrowserRouter синхронизирует отображаемый контент.*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>,
  document.getElementById("root")
);
