import React, { useState, useEffect } from "react";
import Todos from "./Todos";
import { getTodos, addTodo } from "../api/client";

const TodoContainer = () => {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;

    const newTodo = {
      todo: input,
    };
    setSaving(true);
    addTodo(newTodo)
      .then((res) => {
        const newTodos = [...todoList, res];
        setTodoList(newTodos);
        setSaving(false);
      })
      .catch((e) => {
        console.log(e);
      });
    setInput("");
  };

  useEffect(() => {
    let mounted = true;
    getTodos()
      .then((res) => {
        if (mounted) {
          setTodoList(res ? res : []);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="todo-container">
      <h1>TODOS</h1>
      {saving ? (
        "Saving..."
      ) : (
        <form
          onSubmit={handleSubmit}
          data-testid="todo-form"
          className="todo-form"
        >
          <input
            data-testid="todo-input"
            type="text"
            placeholder="Add a todo"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
          />
          <button
            data-testid="todo-button"
            className="todo-button"
            onSubmit={addTodo}
          >
            Add Todo
          </button>
        </form>
      )}
      {loading ? "Loading..." : <Todos todoList={todoList} />}
    </div>
  );
};

export default TodoContainer;
