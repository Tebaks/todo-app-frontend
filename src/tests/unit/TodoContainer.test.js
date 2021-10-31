import React from "react";
import TodoContainer from "../../components/TodoContainer";
import {
  render,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";

describe("TodosContainer", () => {
  test("should have TODOS header", async () => {
    const doc = render(<TodoContainer />);
    const content = await doc.findByText("TODOS");
    expect(content).toBeInTheDocument();
  });
  test("should show Todos element", async () => {
    const doc = render(<TodoContainer />);
    await waitForElementToBeRemoved(() => doc.queryByText("Loading..."), {
      timeout: 10000,
    });
    const todos = doc.queryAllByTestId("todo");

    expect(todos.length).toBe(2);
  });
  test("should have form to add todo", () => {
    const doc = render(<TodoContainer />);

    const form = doc.getByTestId("todo-form");
    const input = doc.getByTestId("todo-input");
    const button = doc.getByTestId("todo-button");

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test("should add data to list", async () => {
    const doc = render(<TodoContainer />);
    await waitForElementToBeRemoved(() => doc.queryByText("Loading..."), {
      timeout: 10000,
    });

    let input = doc.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "buy some milk" } });

    expect(input.value).toEqual("buy some milk");

    const button = doc.getByTestId("todo-button");
    fireEvent.click(button);

    await waitForElementToBeRemoved(() => doc.queryByText("Saving..."), {
      timeout: 10000,
    });
    input = doc.getByTestId("todo-input");
    expect(input.value).toEqual("");

    const todos = doc.queryAllByTestId("todo");

    expect(todos.length).toBe(3);
    expect(todos[2].textContent).toEqual("buy some milk");
  });
});
