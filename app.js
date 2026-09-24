import express from "express";
import routes from "./routes/employees.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/api/employees", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
app.listen(PORT, () => {
  console.log(`Server runs on port: http://localhost:${PORT}`);
});
