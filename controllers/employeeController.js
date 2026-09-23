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
  const employees = db.getAllPosts();
  res.status(200).json(employees);
};


export const getEmployeeById = (req, res) => {
  const employee = db.getPostById(+req.params.id);
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

  const saved = db.savePost(req.body);
  const employee = db.getPostById(saved.lastInsertRowid);
  res.status(201).json(employee);
};


export const deleteEmployee = (req, res) => {
  const employee = db.getPostById(+req.params.id);
  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  db.deletePost(+req.params.id);
  res.sendStatus(204);
};


export const updateEmployee = (req, res) => {
  const id = +req.params.id;
  const employee = db.getPostById(id);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  const error = validateEmployee(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  db.updatePost(id, req.body);
  const updatedEmployee = db.getPostById(id);
  res.status(200).json(updatedEmployee);
};