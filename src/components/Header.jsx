import React, { useContext } from "react";
import Contextpage from "../Contextpage";
import { HiChevronLeft } from "react-icons/hi";
import { motion } from "framer-motion";

function Header() {
  const { header, backgenre } = useContext(Contextpage);

  return (
    <>
      <header
        className={`flex items-center ${
          backgenre ? "justify-between" : "justify-center"
        } py-6 px-6 md:px-10 bg-gradient-to-r from-transparent via-black/10 to-transparent`}
      >
        {backgenre && (
          <motion.a
            href="/"
            className="glass text-white p-3 rounded-2xl text-xl md:text-2xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiChevronLeft />
          </motion.a>
        )}
        <motion.h1
          className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {header}
        </motion.h1>
        {backgenre && <div className="w-12"></div>} {/* Spacer for alignment */}
      </header>
    </>
  );
}

export default Header;
