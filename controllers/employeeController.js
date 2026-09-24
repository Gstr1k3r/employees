import * as db from "../database/database.js";

const validateEmployee = (body) => {
  const {
    company,
    lastname,
    firstname,
    position,
    salary,
    department,
    gender,
    holiday_days,
    birth_date,
  } = body;

  if (
    !company ||
    !lastname ||
    !firstname ||
    !position ||
    !salary ||
    !department ||
    !gender ||
    holiday_days === undefined ||
    !birth_date
  ) {
    return "Every field is required";
  }

  if (salary <= 0) {
    return "Salary must be greater than 0";
  }

  if (holiday_days < 0) {
    return "Holiday days cannot be negative";
  }

  if (isNaN(Date.parse(birth_date))) {
    return "Birth date must be a valid date";
  }

  return null;
};

export const getAllEmployees = (req, res) => {
  const employees = db.getAllEmployees();
  res.status(200).json(employees);
};

export const getEmployeeById = (req, res) => {
  const employee = db.getEmployeeById(+req.params.id);
  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }
  res.status(200).json(employee);
};

export const createEmployee = (req, res) => {
  const error = validateEmployee(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const saved = db.saveEmployee(req.body);
  const employee = db.getEmployeeById(saved.lastInsertRowid);
  res.status(201).json(employee);
};

export const deleteEmployee = (req, res) => {
  const employee = db.getEmployeeById(+req.params.id);
  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  db.deleteEmployee(+req.params.id);
  res.sendStatus(204);
};

export const updateEmployee = (req, res) => {
  const id = +req.params.id;
  const employee = db.getEmployeeById(id);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  const error = validateEmployee(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  db.updateEmployee(id, req.body);
  const updatedEmployee = db.getEmployeeById(id);
  res.status(200).json(updatedEmployee);
};
