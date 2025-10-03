import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import Contextpage from "../Contextpage";
import { useNavigate } from "react-router-dom";
import slugify from "react-slugify";

function Searchbar() {
  const { filteredGenre, fetchSearch, setBackGenre, setGenres } =
    useContext(Contextpage);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = () => {
    // Clear the previous timeout to prevent premature execution
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    const newTimeout = setTimeout(() => {
      onKeyUp(value);
    }, 500); // Adjust the timeout duration as needed (in milliseconds)

    setTypingTimeout(newTimeout);
  };

  const onKeyUp = (query) => {
    // console.log(query)
    if (query !== "") {
      query = query.trim();

      if (query === "") {
        navigate("/");
      } else {
        navigate(`/search/${slugify(query)}`);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>MovieMate</title>
      </Helmet>

      <div className="w-full bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 h-[8rem] md:h-[9rem] relative overflow-hidden border-b border-white/10">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 0.5px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          ></div>
        </div>

        <div className="h-full w-full bg-gradient-to-b from-transparent via-black/10 to-black/20 flex justify-center items-center px-4">
          <div className="w-full max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              name="searchpanel"
              id="searchpanel"
              placeholder="Search movies & shows..."
              className="w-full pl-11 pr-4 py-3 glass rounded-xl outline-none text-white placeholder-gray-400 border border-white/20 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 text-sm backdrop-blur-xl shadow-lg"
              onKeyUp={(e) => handleSearch()}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {value && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                onClick={() => setValue("")}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchbar;
