import { FaSearch, FaBell } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setFilteredMusics } from "../../store/musicSlice";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allMusics = useSelector((state) => state?.music?.allMusics);

  useEffect(() => {
    if (query.trim() === "") {
      dispatch(setFilteredMusics(allMusics));
    } else {
      const filtered = allMusics?.filter(
        (music) =>
          music?.title?.toLowerCase().includes(query.toLowerCase()) ||
          music?.artist?.toLowerCase().includes(query.toLowerCase())
      );
      dispatch(setFilteredMusics(filtered || []));
    }
  }, [query, allMusics, dispatch]);

  return (
    <header className="sticky top-0 z-50 bg-[#121212] mt-2.5">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-md bg-[#242424] hover:bg-[#2a2a2a] transition-colors"
            aria-label="Go back"
          >
            <IoChevronBackSharp className="w-5 h-5 text-white" />
          </button>
          
          <nav className="flex items-center text-sm">
            <span className="text-[#a7a7a7] hover:text-white cursor-pointer" onClick={() => navigate("/")}>
              Home
            </span>
            <span className="mx-2 text-[#a7a7a7]">/</span>
            <span className="font-medium text-white">Popular Artist</span>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative w-[300px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="w-4 h-4 text-[#a7a7a7]" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full py-2 pl-10 pr-4 text-sm bg-[#242424] rounded-md placeholder-[#a7a7a7] text-white focus:outline-none focus:ring-2 focus:ring-[#1db954]"
              placeholder="Search music, artist, albums..."
              aria-label="Search"
            />
          </div>

          {/* Notification Bell */}
          <button className="p-2 bg-[#242424] rounded-md hover:bg-[#2a2a2a] transition-colors">
            <FaBell className="w-5 h-5 text-[#a7a7a7] hover:text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;