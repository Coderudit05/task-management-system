import { employees } from "../data/db";

export function getAdmin() {
  return employees.find((user) => user.role === "admin");
}

export function isAdmin(email, password) {
  const admin = getAdmin();
  return admin && admin.email === email && admin.password === password;
}
