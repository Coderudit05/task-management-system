import { employees } from "../data/db"

export const isValidUser = (email, password) => {

    return employees.find(
        (user)=> user.email === email && user.password === password
    );
}