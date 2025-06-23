import { NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/rounded.png";
import { IoChevronBackSharp } from "react-icons/io5";

const Header = () => {
	const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md bg-[#242424] hover:bg-[#2a2a2a] transition-colors"
          aria-label="Go back"
        >
          <IoChevronBackSharp className="w-5 h-5 text-white" />
        </button>
        <NavLink to="/" className="rounded-lg">
          <img src={logo} className="size-10 text-black" />
        </NavLink>
        <div>
          <h1 className="text-3xl font-bold">Music Manager</h1>
          <p className="text-zinc-400 mt-1">Manage your music catalog</p>
        </div>
      </div>
      {/* <UserButton /> */}
    </div>
  );
};
export default Header;
