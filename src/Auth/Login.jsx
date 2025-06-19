import {
  useDispatch,
  NavLink,
  useNavigate,
  toast,
  axios,
  useState,
} from "../utils/lib";

import { LOGIN } from "../utils/constants";
import { setUser } from "../store/userSlice";
import logo from "../assets/rounded.png"

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN,
        { email, password },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      dispatch(setUser(response.data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setPassword("");
    setEmail("");
  };

  return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center z-50">
      <div className="bg-black backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md relative border-3 border-gray-700">
       
        <button
          className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-white"
          onClick={() => navigate("/")}
        >
          &times;
        </button>

        <div className="flex flex-col items-center mb-6 ">
              <div className="flex justify-center ">
          <img
            src={logo}
            alt="Logo"
            className="w-full  h-auto object-cover"
          />
        </div>
          <h2 className="text-white text-2xl font-semibold mt-4">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-400">Login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-zinc-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-zinc-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-lg text-gray-400"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-700 transition-colors text-white font-bold rounded-lg py-2"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <NavLink to="/register" className="text-emerald-400 hover:underline">
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
