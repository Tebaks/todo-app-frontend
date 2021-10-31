import React from "react";
import Todos from "../../components/Todos";
import { render } from "@testing-library/react";

const mockData = [
  {
    id: "69dc3f3f-990f-4fc7-a565-c4dbe582a754",
    todo: "Learn CDC",
    done: false,
  },
  {
    id: "a1138513-eec7-4cf3-894a-69755e375137",
    todo: "Implement CDC",
    done: false,
  },
];
describe("Todos", () => {
  test("should show no data when todoList is empty", async () => {
    const doc = render(<Todos todoList={[]} />);
    const todos = doc.queryAllByTestId("todo");

    expect(todos.length).toBe(0);
  });
  test("should show Todos when todoList is not empty", async () => {
    const doc = render(<Todos todoList={mockData} />);
    const todos = doc.queryAllByTestId("todo");
    expect(todos.length).toBe(2);
    expect(todos[0].textContent).toEqual("Learn CDC");
    expect(todos[1].textContent).toEqual("Implement CDC");
  });
});
