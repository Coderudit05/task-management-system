import { employees } from "../data/db";

export function getAdmin() {
  return employees.find((user) => user.role === "admin");
}

export function isAdmin(email) {
  const admin = getAdmin();
  return admin && admin.email === email;
}
