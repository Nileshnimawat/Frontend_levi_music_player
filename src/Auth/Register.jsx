import {
  useNavigate,
  NavLink,
  useState,
  axios,
  toast,
} from "../utils/lib";

import { SIGNUP } from "../utils/constants";
import { User, AtSign, Lock, BadgeCheck } from "lucide-react";
import logo from "../assets/rounded.png";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        SIGNUP,
        { name, username, email, password },
        { withCredentials: true }
      );
      toast.success(response.data.message || "Registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    // Optional: clear only on success, not failure
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-gray-950 h-screen w-full flex items-center justify-center">
      <div className=" relative bg-black border-3  border-gray-700 backdrop-blur-md text-white rounded-2xl p-6 pt-0 w-full max-w-md shadow-2xl">
        <button
          className="absolute top-4 right-4 text-2xl hover:text-red-500"
          onClick={() => navigate("/")}
        >
          &times;
        </button>

        <div className="flex justify-center ">
          <img src={logo} alt="Logo" className="w-85 h-auto object-contain" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Start your journey with us today!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              maxLength={25}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 p-3 bg-transparent border border-gray-700 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Username */}
          <div className="relative">
            <BadgeCheck className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 p-3 bg-transparent border border-gray-700 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <AtSign className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-3 bg-transparent border border-gray-700 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 p-3 bg-transparent border border-gray-700 rounded focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 text-sm"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full  bg-emerald-500 hover:bg-emerald-700  text-white font-semibold py-2 rounded-full hover:scale-105 transition-transform duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-400">
          Already have an account?
          <NavLink to="/login" className="text-emerald-500 underline ml-1">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
