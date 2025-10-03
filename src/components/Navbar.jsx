import React, { useState, useContext } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import Contextpage from "../Contextpage";
import { motion } from "framer-motion";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import User from "../assets/images/User.jpg";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import AdsenseComponent from "./AdsenseComponent";

function Navbar() {
  const { header, user } = useContext(Contextpage);
  const [activemobile, setActivemobile] = useState(false);

  // console.log(user)
  const Navdata = [
    {
      id: 1,
      headername: "Genres",
      Name: "Genres",
      link: "/",
    },
    {
      id: 2,
      headername: "Trending Movies",
      Name: "Trending",
      link: "/trending",
    },
    {
      id: 3,
      headername: "Upcoming Movies",
      Name: "Upcoming",
      link: "/upcoming",
    },
    {
      id: 4,
      headername: "Favorite Movies",
      Name: "Favorites",
      link: "/favorite",
    },
    {
      id: 5,
      headername: "Anime",
      Name: "Anime",
      link: "/anime",
    },
  ];

  return (
    <>
      {/* mobilebutton */}
      <motion.button
        className="z-40 text-2xl text-white fixed right-0 bottom-0 m-6 p-4 glass rounded-2xl border border-white/20 shadow-2xl block md:hidden"
        onClick={() => setActivemobile(!activemobile)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {activemobile ? <HiX /> : <HiMenuAlt1 />}
      </motion.button>

      <nav
        className={`${
          activemobile ? "block" : "hidden"
        } fixed glass h-full w-full md:w-[16rem] z-30 md:block border-r border-white/10`}
      >
        <motion.div
          animate={{ scale: 1, opacity: 1 }}
          initial={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link
            to="/"
            className="logo flex flex-col justify-center items-center m-7 gap-3 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300"
            onClick={() => setActivemobile(!activemobile)}
          >
            <img src={logo} alt="logo" className="w-20 drop-shadow-lg" />
            <h1 className="text-white font-bold text-xl text-center bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              MovieMate
            </h1>
          </Link>
        </motion.div>

        <ul className="text-white font-medium text-[15px] px-4 space-y-2">
          {Navdata.map((data) => (
            <motion.li
              key={data.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={data.link}>
                <div
                  className={`${
                    header == data.headername
                      ? "active shadow-lg"
                      : "bg-white/5 hover:bg-white/10 hover:border-red-400/30"
                  } p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group`}
                  onClick={() => setActivemobile(!activemobile)}
                >
                  <span className="group-hover:text-white transition-colors duration-300">
                    {data.Name}
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Loginsection */}

        <div className="absolute bottom-0 w-full p-4 text-white">
          {user ? (
            <>
              <motion.div
                className="w-full glass px-4 py-3 gap-3 rounded-2xl flex items-center font-medium border border-white/20 mb-3"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={user.photoURL == null ? User : user.photoURL}
                  alt="user"
                  className="h-12 w-12 rounded-full object-cover border-2 border-white/20"
                />
                <div className="flex-1 min-w-0">
                  <h1 className="truncate text-sm">{user.displayName}</h1>
                  <p className="text-xs text-gray-400">Online</p>
                </div>
              </motion.div>

              <motion.div
                className="cursor-pointer bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex justify-center items-center p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                onClick={() => auth.signOut(toast.error("Logout successfully"))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h1 className="font-medium">Sign Out</h1>
              </motion.div>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setActivemobile(!activemobile)}>
                <motion.div
                  className="w-full glass py-3 gap-4 rounded-2xl flex items-center justify-center font-medium border border-white/20 hover:border-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h1>Sign In</h1>
                </motion.div>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
