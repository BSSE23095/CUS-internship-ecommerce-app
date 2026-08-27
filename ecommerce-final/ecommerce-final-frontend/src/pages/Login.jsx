import { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { API_URL } from "../config";

const Login = () => {
  const { setToken, setAdminToken, navigate } = useContext(ShopContext);
  const [loginMode, setLoginMode] = useState("customer"); // "customer" | "admin"
  const [currentState, setCurrentState] = useState("Login"); // "Login" | "Sign Up"
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (loginMode === "admin") {
        const response = await axios.post(`${API_URL}/api/user/admin`, {
          email: formData.email,
          password: formData.password,
        });

        if (response.data.success) {
          setAdminToken(response.data.token);
          navigate("/admin/products");
        } else {
          alert(response.data.message);
        }
        return;
      }

      const endpoint =
        currentState === "Login" ? "/api/user/login" : "/api/user/register";

      const response = await axios.post(
        `${API_URL}${endpoint}`,
        formData
      );

      if (response.data.success) {
        setToken(response.data.token);
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Is the backend server running?"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14">
      {/* Customer / Admin toggle */}
      <div className="flex text-sm border rounded-full overflow-hidden mb-6">
        <button
          type="button"
          onClick={() => setLoginMode("customer")}
          className={`px-5 py-1.5 ${
            loginMode === "customer" ? "bg-black text-white" : "text-gray-500"
          }`}
        >
          Customer
        </button>

        <button
          type="button"
          onClick={() => setLoginMode("admin")}
          className={`px-5 py-1.5 ${
            loginMode === "admin" ? "bg-black text-white" : "text-gray-500"
          }`}
        >
          Admin
        </button>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-full gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2">
          <p className="text-3xl">
            {loginMode === "admin" ? "Admin Login" : currentState}
          </p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {loginMode === "customer" && currentState === "Sign Up" && (
          <input
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            placeholder="Name"
            className="w-full px-3 py-2 border border-gray-800 rounded"
          />
        )}

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email"
          className="w-full px-3 py-2 border border-gray-800 rounded"
        />

        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={onChangeHandler}
          placeholder="Password"
          className="w-full px-3 py-2 border border-gray-800 rounded"
        />

        {loginMode === "customer" && (
          <div className="w-full flex justify-between text-sm">
            <p className="cursor-pointer">Forgot password?</p>

            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer"
              >
                Create account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className="cursor-pointer"
              >
                Already have an account? Login
              </p>
            )}
          </div>
        )}

        <button
          disabled={loading}
          className="bg-black text-white font-light px-8 py-2 mt-4 w-full disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : loginMode === "admin"
            ? "Sign In as Admin"
            : currentState === "Login"
            ? "Sign In"
            : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;