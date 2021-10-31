import React from "react";

const Todos = ({ todoList }) => {
  return (
    <div data-testid="todos" className="todos">
      {todoList.map((todo) => {
        return (
          <div data-testid="todo" className="todo" key={todo.id}>
            <h2 data-testid="content" className="content">
              {todo.todo}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
