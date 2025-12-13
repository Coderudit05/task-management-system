import { isAdmin, getAdmin } from "../utils/admin";
import { isValidUser } from "../utils/users";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();

    // ---------------------------
    // 1. ADMIN LOGIN CHECK
    // ---------------------------
    if (isAdmin(email)) {
      const admin = getAdmin(); // fetch full admin object from db

      login({
        ...admin,
        isLoggedIn: true,
      });

      navigate("/admin");
      return;
    }

    // ---------------------------
    // 2. EMPLOYEE LOGIN CHECK
    // ---------------------------
    const validEmployee = isValidUser(email);

    if (validEmployee) {
      login({
        ...validEmployee, // spread full employee object
        isLoggedIn: true,
      });

      navigate("/employee");
      return;
    }

    // ---------------------------
    // 3. INVALID USER
    // ---------------------------
    alert("Invalid Email!");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <h2 className="text-white text-3xl font-semibold mb-6 tracking-wide">
        Login
      </h2>

      <form
        className="
          bg-gray-800/70 
          backdrop-blur-lg 
          p-8 
          rounded-2xl 
          shadow-xl 
          border border-gray-700 
          w-full 
          max-w-sm
        "
        onSubmit={handleSubmit}
      >
        <div className="space-y-5">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="
                bg-gray-900 
                text-gray-200 
                border border-gray-600 
                p-3 
                rounded-lg 
                outline-none 
                focus:border-blue-500 
                focus:ring-2 
                focus:ring-blue-400/40
              "
              required
            />
          </div>

          {/* Button */}
          <div className="flex justify-end pt-3">
            <button
              className="
                bg-blue-600 
                text-white 
                px-5 
                py-2.5 
                rounded-lg 
                transition 
                hover:bg-blue-700 
                hover:shadow-blue-500/30 
                hover:shadow-lg
              "
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
