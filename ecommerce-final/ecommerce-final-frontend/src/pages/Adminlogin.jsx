import { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const AdminLogin = () => {
  const { setAdminToken, navigate } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setAdminToken(response.data.token);
        navigate("/admin/products");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <p className="text-3xl mb-4">Admin Login</p>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Admin email"
        className="w-full px-3 py-2 border border-gray-800 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Admin password"
        className="w-full px-3 py-2 border border-gray-800 rounded"
      />

      <button
        disabled={loading}
        className="bg-black text-white font-light px-8 py-2 mt-4 w-full disabled:opacity-50"
      >
        {loading ? "Please wait..." : "Sign In"}
      </button>
    </form>
  );
};

export default AdminLogin;