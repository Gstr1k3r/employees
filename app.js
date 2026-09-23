import express from "express";
import routes from "./routes/employees.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server runs on port: http://localhost:${PORT}`);
});
