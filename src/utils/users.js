import { employees } from "../data/db"

export const isValidUser = (email) => {

    return employees.find(
        (user)=> user.email === email
    );
}