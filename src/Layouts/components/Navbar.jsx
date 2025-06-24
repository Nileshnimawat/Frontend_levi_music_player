import { FaSearch, FaBell } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#121212] mt-2.5">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Back & Path */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-md bg-[#242424] hover:bg-[#2a2a2a]"
          >
            <IoChevronBackSharp className="w-5 h-5 text-white" />
          </button>

          <nav className="flex items-center text-sm">
            <span
              className="text-[#a7a7a7] hover:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </span>
            <span className="mx-2 text-[#a7a7a7]">/</span>
            <span className="text-white font-medium">Search</span>
          </nav>
        </div>

        {/* Search + Bell */}
        <div className="flex items-center gap-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setQuery("");
            }}
            className="relative w-[300px]"
          >
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="w-4 h-4 text-[#a7a7a7]" />
            </div>
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              className="block w-full py-2 pl-10 pr-4 text-sm bg-[#242424] rounded-md text-white placeholder-[#a7a7a7] focus:outline-none focus:ring-2 focus:ring-[#1db954]"
              placeholder="Search music, artist, albums..."
            />
          </form>

          <button className="p-2 bg-[#242424] rounded-md hover:bg-[#2a2a2a]">
            <FaBell className="w-5 h-5 text-[#a7a7a7] hover:text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
