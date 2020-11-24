import React from "react";
import "./App.css";
import InputTodo from "./components/InputTodo";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

export default () => (
  <>
    <div className="App todoapp">
      <header className="header">
        <Header numTodos={10}/>
        <InputTodo />
      </header>
      <section className="main">
      <TodoList tasks={["test","222222"]} />
      </section>
    </div>
  </>
);
