import puppeteer from "puppeteer";

const appUrlBase = process.env.REACT_APP_URL || "http://localhost:3000";

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({});
  page = await browser.newPage();
});

describe("TODOS", () => {
  test("Show Heading", async () => {
    await page.goto(`${appUrlBase}/`);
    await page.waitForSelector("h1");
    const result = await page.evaluate(() => {
      return document.querySelector("h1").innerText;
    });

    expect(result).toEqual("TODOS");
  });

  test("List Todos", async () => {
    await page.goto(`${appUrlBase}`);
    await page.waitForSelector(".todos");
    const todos = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(".todo .content"),
        (element) => element.textContent
      )
    );

    expect(todos.length).toEqual(2);
    expect(todos[0]).toEqual("Learn CDC");
    expect(todos[1]).toEqual("Implement CDC");
  });

  test("Show Input Box", async () => {
    await page.goto(`${appUrlBase}`);
    await page.waitForSelector(".todo-input");
    const result = await page.evaluate(() => {
      return document.querySelector(".todo-input").getAttribute("placeholder");
    });
    expect(result).toEqual("Add a todo");
  });

  test("Show Add Button", async () => {
    await page.goto(`${appUrlBase}`);
    await page.waitForSelector(".todo-input");
    const result = await page.evaluate(() => {
      return document.querySelector(".todo-button").innerText;
    });
    expect(result).toEqual("Add Todo");
  });

  test("Add Todo", async () => {
    await page.goto(`${appUrlBase}`);
    await page.waitForSelector(".todos");
    await page.click(".todo-input");
    await page.keyboard.type("buy some milk");
    await page.click(".todo-button");
    await page.waitForSelector(".todo-form");

    const todos = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(".todo .content"),
        (element) => element.textContent
      )
    );
    expect(todos.length).toEqual(3);
    expect(todos[0]).toEqual("Learn CDC");
    expect(todos[1]).toEqual("Implement CDC");
    expect(todos[2]).toEqual("buy some milk");
  });
});

afterAll(() => {
  browser.close();
});
