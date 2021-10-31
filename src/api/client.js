import axios from "axios";

const apiUrl =
  process.env.REACT_APP_API_URL ||
  "https://f80c975b-8d9d-4f70-a017-e8e0c4b16bdb.mock.pstmn.io";

export const getTodos = async () => {
  const res = await axios.get(apiUrl);
  return res.data;
};

export const addTodo = async (todo) => {
  const res = await axios.post(apiUrl, todo);

  return res.data;
};
