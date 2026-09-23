import Database from "better-sqlite3";

const db = new Database("./database/database.sqlite");

db.prepare(
  `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT,
    lastname TEXT,
    firstname TEXT,
    position TEXT,
    salary REAL,
    department TEXT,
    gender TEXT,
    holiday_days INTEGER,
    birth_date TEXT
  )`
).run();

export const getAllPosts = () => db.prepare(`SELECT * FROM posts`).all();

export const getPostById = (id) =>
  db.prepare(`SELECT * FROM posts WHERE id = ?`).get(id);

export const savePost = (emp) =>
  db
    .prepare(
      `INSERT INTO posts (company, lastname, firstname, position, salary, department, gender, holiday_days, birth_date) VALUES (?,?,?,?,?,?,?,?,?)`
    )
    .run(
      emp.company,
      emp.lastname,
      emp.firstname,
      emp.position,
      emp.salary,
      emp.department,
      emp.gender,
      emp.holiday_days,
      emp.birth_date
    );

export const updatePost = (id, emp) =>
  db
    .prepare(
      `UPDATE posts 
       SET company = ?, lastname = ?, firstname = ?, position = ?, salary = ?, department = ?, gender = ?, holiday_days = ?, birth_date = ?
       WHERE id = ?`
    )
    .run(
      emp.company,
      emp.lastname,
      emp.firstname,
      emp.position,
      emp.salary,
      emp.department,
      emp.gender,
      emp.holiday_days,
      emp.birth_date,
      id
    );

export const deletePost = (id) =>
  db.prepare(`DELETE FROM posts WHERE id = ?`).run(id);

// Initial Seed Adatok
const { postCount } = db
  .prepare(`SELECT COUNT(*) AS postCount FROM posts`)
  .get();

if (postCount === 0) {
  const initialEmployees = [
    { company: "TechCorp", lastname: "Kovács", firstname: "Péter", position: "Szoftverfejlesztő", salary: 850000, department: "IT", gender: "Férfi", holiday_days: 22, birth_date: "1988-04-12" },
    { company: "Innovate Ltd", lastname: "Nagy", firstname: "Anna", position: "HR Manager", salary: 720000, department: "HR", gender: "Nő", holiday_days: 25, birth_date: "1992-09-25" },
    { company: "DataSys", lastname: "Szabó", firstname: "Gábor", position: "Adatelemző", salary: 680000, department: "Analytics", gender: "Férfi", holiday_days: 20, birth_date: "1995-01-15" },
    { company: "TechCorp", lastname: "Tóth", firstname: "Eszter", position: "Projektmenedzser", salary: 790000, department: "IT", gender: "Nő", holiday_days: 24, birth_date: "1985-11-03" },
    { company: "SoftSolutions", lastname: "Horváth", firstname: "Zoltán", position: "DevOps Mérnök", salary: 920000, department: "IT", gender: "Férfi", holiday_days: 21, birth_date: "1990-06-18" },
    { company: "Innovate Ltd", lastname: "Varga", firstname: "Katalin", position: "Pénzügyi Munkatárs", salary: 610000, department: "Pénzügy", gender: "Nő", holiday_days: 23, birth_date: "1994-03-30" },
    { company: "GlobalMedia", lastname: "Kiss", firstname: "Máté", position: "Marketing Specialist", salary: 580000, department: "Marketing", gender: "Férfi", holiday_days: 20, birth_date: "1997-08-14" },
    { company: "DataSys", lastname: "Molnár", firstname: "Dóra", position: "UX/UI Tervező", salary: 750000, department: "Design", gender: "Nő", holiday_days: 22, birth_date: "1993-02-22" },
    { company: "TechCorp", lastname: "Németh", firstname: "Balázs", position: "Rendszeradminisztrátor", salary: 670000, department: "IT", gender: "Férfi", holiday_days: 26, birth_date: "1982-12-05" },
    { company: "SoftSolutions", lastname: "Farkas", firstname: "Réka", position: "QA Tesztelő", salary: 590000, department: "IT", gender: "Nő", holiday_days: 21, birth_date: "1998-05-19" },
    { company: "Innovate Ltd", lastname: "Balogh", firstname: "Dániel", position: "Értékesítési Vezető", salary: 890000, department: "Sales", gender: "Férfi", holiday_days: 25, birth_date: "1987-07-08" },
    { company: "GlobalMedia", lastname: "Takács", firstname: "Júlia", position: "Tartalomgyártó", salary: 520000, department: "Marketing", gender: "Nő", holiday_days: 20, birth_date: "1999-10-11" },
    { company: "DataSys", lastname: "Juhász", firstname: "Tamás", position: "Backend Fejlesztő", salary: 880000, department: "IT", gender: "Férfi", holiday_days: 22, birth_date: "1991-04-02" },
    { company: "TechCorp", lastname: "Lakatos", firstname: "Viktória", position: "Toborzó Specialist", salary: 560000, department: "HR", gender: "Nő", holiday_days: 21, birth_date: "1996-01-29" },
    { company: "SoftSolutions", lastname: "Mészáros", firstname: "Ádám", position: "Frontend Fejlesztő", salary: 810000, department: "IT", gender: "Férfi", holiday_days: 20, birth_date: "1994-09-17" },
    { company: "Innovate Ltd", lastname: "Simon", firstname: "Zsófia", position: "Főkönyvelő", salary: 830000, department: "Pénzügy", gender: "Nő", holiday_days: 27, birth_date: "1980-03-14" },
    { company: "GlobalMedia", lastname: "Rácz", firstname: "Dávid", position: "SEO Szakértő", salary: 630000, department: "Marketing", gender: "Férfi", holiday_days: 20, birth_date: "1993-11-23" },
    { company: "DataSys", lastname: "Fekete", firstname: "Bettina", position: "Adatmérnök", salary: 870000, department: "Analytics", gender: "Nő", holiday_days: 23, birth_date: "1990-08-31" },
    { company: "TechCorp", lastname: "Szilágyi", firstname: "András", position: "Solution Architect", salary: 1150000, department: "IT", gender: "Férfi", holiday_days: 28, birth_date: "1979-05-16" },
    { company: "SoftSolutions", lastname: "Pásztor", firstname: "Laura", position: "Scrum Master", salary: 780000, department: "IT", gender: "Nő", holiday_days: 22, birth_date: "1991-12-08" },
    { company: "Innovate Ltd", lastname: "Vass", firstname: "Norbert", position: "Account Manager", salary: 700000, department: "Sales", gender: "Férfi", holiday_days: 21, birth_date: "1989-02-19" },
    { company: "GlobalMedia", lastname: "Sipos", firstname: "Boglárka", position: "Social Media Manager", salary: 540000, department: "Marketing", gender: "Nő", holiday_days: 20, birth_date: "1998-07-04" },
    { company: "DataSys", lastname: "Gulyás", firstname: "Attila", position: "BI Fejlesztő", salary: 760000, department: "Analytics", gender: "Férfi", holiday_days: 24, birth_date: "1986-10-27" },
    { company: "TechCorp", lastname: "Bíró", firstname: "Orsolya", position: "Jogi Tanácsadó", salary: 950000, department: "Legal", gender: "Nő", holiday_days: 26, birth_date: "1984-06-01" },
    { company: "SoftSolutions", lastname: "Kerekes", firstname: "Márk", position: "Mobile Fejlesztő", salary: 840000, department: "IT", gender: "Férfi", holiday_days: 20, birth_date: "1995-03-22" },
    { company: "Innovate Ltd", lastname: "Illés", firstname: "Enikő", position: "Irodavezető", salary: 480000, department: "Adminisztráció", gender: "Nő", holiday_days: 22, birth_date: "1996-09-12" },
    { company: "GlobalMedia", lastname: "Lukács", firstname: "Kristóf", position: "Videóvágó", salary: 590000, department: "Marketing", gender: "Férfi", holiday_days: 21, birth_date: "1997-04-05" },
    { company: "DataSys", lastname: "Fodor", firstname: "Lilla", position: "Adatbázis Adminisztrátor", salary: 820000, department: "IT", gender: "Nő", holiday_days: 23, birth_date: "1989-01-30" },
    { company: "TechCorp", lastname: "Szalai", firstname: "Gergő", position: "Biztonsági Szakértő", salary: 980000, department: "IT", gender: "Férfi", holiday_days: 25, birth_date: "1987-11-15" },
    { company: "SoftSolutions", lastname: "Major", firstname: "Nikolett", position: "Termékmenedzser", salary: 900000, department: "Product", gender: "Nő", holiday_days: 22, birth_date: "1992-08-09" },
    { company: "Innovate Ltd", lastname: "Papp", firstname: "Bence", position: "Értékesítési Képviselő", salary: 550000, department: "Sales", gender: "Férfi", holiday_days: 20, birth_date: "1999-02-14" },
    { company: "GlobalMedia", lastname: "Deák", firstname: "Fanni", position: "PR Specialist", salary: 620000, department: "Marketing", gender: "Nő", holiday_days: 21, birth_date: "1994-05-28" },
    { company: "DataSys", lastname: "Kozma", firstname: "László", position: "Machine Learning Mérnök", salary: 1100000, department: "Analytics", gender: "Férfi", holiday_days: 24, birth_date: "1990-12-03" },
    { company: "TechCorp", lastname: "Bognár", firstname: "Klaudia", position: "Bérszámfejtő", salary: 530000, department: "HR", gender: "Nő", holiday_days: 23, birth_date: "1991-07-21" },
    { company: "SoftSolutions", lastname: "Gál", firstname: "Patrik", position: "Fullstack Fejlesztő", salary: 860000, department: "IT", gender: "Férfi", holiday_days: 21, birth_date: "1996-06-11" },
    { company: "Innovate Ltd", lastname: "Veres", firstname: "Bianka", position: "Ügyfélszolgálati Munkatárs", salary: 450000, department: "Support", gender: "Nő", holiday_days: 20, birth_date: "2000-03-08" },
    { company: "GlobalMedia", lastname: "Sándor", firstname: "Viktor", position: "Grafikus", salary: 600000, department: "Design", gender: "Férfi", holiday_days: 22, birth_date: "1993-10-19" },
    { company: "DataSys", lastname: "Boros", firstname: "Evelin", position: "Adatminőségi Elemző", salary: 640000, department: "Analytics", gender: "Nő", holiday_days: 20, birth_date: "1997-12-16" },
    { company: "TechCorp", lastname: "Kelemen", firstname: "Zoltán", position: "Infrastruktúra Mérnök", salary: 910000, department: "IT", gender: "Férfi", holiday_days: 26, birth_date: "1983-04-25" },
    { company: "SoftSolutions", lastname: "Vince", firstname: "Kinga", position: "Business Analyst", salary: 770000, department: "Analytics", gender: "Nő", holiday_days: 23, birth_date: "1988-09-02" },
    { company: "Innovate Ltd", lastname: "Hegedűs", firstname: "Márton", position: "IT Support Technikus", salary: 490000, department: "IT", gender: "Férfi", holiday_days: 20, birth_date: "1998-11-30" },
    { company: "GlobalMedia", lastname: "Pintér", firstname: "Dorina", position: "Rendezvényszervező", salary: 570000, department: "Marketing", gender: "Nő", holiday_days: 21, birth_date: "1995-05-14" },
    { company: "DataSys", lastname: "Katona", firstname: "Roland", position: "Cloud Architect", salary: 1200000, department: "IT", gender: "Férfi", holiday_days: 27, birth_date: "1981-08-07" },
    { company: "TechCorp", lastname: "Török", firstname: "Monika", position: "Compliance Officer", salary: 880000, department: "Legal", gender: "Nő", holiday_days: 25, birth_date: "1986-02-11" },
    { company: "SoftSolutions", lastname: "Orosz", firstname: "Mihály", position: "Szoftverfejlesztő", salary: 830000, department: "IT", gender: "Férfi", holiday_days: 21, birth_date: "1993-07-03" },
    { company: "Innovate Ltd", lastname: "Somogyi", firstname: "Virág", position: "Belső Kommunikációs Specialist", salary: 580000, department: "HR", gender: "Nő", holiday_days: 22, birth_date: "1996-10-24" },
    { company: "GlobalMedia", lastname: "Fábián", firstname: "Lóránt", position: "Copywriter", salary: 510000, department: "Marketing", gender: "Férfi", holiday_days: 20, birth_date: "1997-01-09" },
    { company: "DataSys", lastname: "Tamás", firstname: "Szilvia", position: "Pénzügyi Elemző", salary: 710000, department: "Pénzügy", gender: "Nő", holiday_days: 23, birth_date: "1992-04-17" },
    { company: "TechCorp", lastname: "Pál", firstname: "Dominik", position: "Cybersecurity Analyst", salary: 890000, department: "IT", gender: "Férfi", holiday_days: 22, birth_date: "1994-12-20" },
    { company: "SoftSolutions", lastname: "Varga", firstname: "Flóra", position: "UI Designer", salary: 730000, department: "Design", gender: "Nő", holiday_days: 20, birth_date: "1996-03-05" },
  ];

  for (const emp of initialEmployees) {
    savePost(emp);
  }
}