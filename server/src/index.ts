import express from "express";
import cors from "cors";
import fs from "fs";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Hello From backend");
});
let todos: any = [];
let counter = 1;

app.post("/addTodo", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(405).send({ message: "Title and Description are required" });
    return;
  }
  try {
    todos.push({ id: counter, title, description });
    fs.writeFileSync("file.txt", JSON.stringify(todos));
    counter++;
    res.status(200).send({ message: "Todo added successfully" });
  } catch (error) {
    console.error("Error while writing");
  }
});

app.get("/getAllTodo", (req, res) => {
  try {
    const result = fs.readFileSync("file.txt", "utf-8");
    if (!result) {
      res.status(200).json([]);
      return;
    }
    const parseData = JSON.parse(result);
    res.status(200).json(parseData);
  } catch (error) {
    console.error("Error while reading or parsing:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
