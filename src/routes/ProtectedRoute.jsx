import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


export default function ProtectedRoute({children,requiredRole}) {

    // fetch the current user from context
    const {user} = useAuth();

    // check user logged in or not

    if(!user ){
        // Not logged in - redirect to login
        return <Navigate to="/login" replace />
    }

    // check role match kr ra hai ya nahi

    if(requiredRole && user.role !== requiredRole){
        // role match nahi kr rha - redirect to login
        return <Navigate to="/login" replace />
    }

    // all checks passed, render the children components

  return children; // Render the protected component because all checks passed
}
