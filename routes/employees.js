import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("api/employees", getAllEmployees);
router.get("api/employees/:id", getEmployeeById);
router.post("api/employees", createEmployee);
router.delete("api/employees/:id", deleteEmployee);
router.put("api/employees/:id", updateEmployee);

export default router;
