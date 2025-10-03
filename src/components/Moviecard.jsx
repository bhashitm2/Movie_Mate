import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import noimage from "../assets/images/no-image.jpg";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
import Contextpage from "../Contextpage";

function Moviecard({ movie }) {
  const { user } = useContext(Contextpage);

  const [isBookmarked, setIsBookmarked] = useState(null);

  useEffect(() => {
    if (localStorage.getItem(movie.id)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [movie.id]);

  const BookmarkMovie = () => {
    if (!user) {
      toast.info("To bookmark this movie, please log in.");
    } else {
      setIsBookmarked(!isBookmarked);
      if (isBookmarked) {
        localStorage.removeItem(movie.id);
      } else {
        localStorage.setItem(movie.id, JSON.stringify(movie));
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
      className="card relative w-full md:w-64 h-[420px] md:h-[380px] my-3 mx-4 md:my-5 md:mx-0 cursor-pointer rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-b from-transparent to-black/50"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* bookmark buttons */}
      <motion.button
        className="absolute glass text-white p-2.5 z-20 right-0 m-4 rounded-xl text-lg border border-white/20 shadow-lg"
        onClick={BookmarkMovie}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isBookmarked ? (
          <AiFillStar className="text-yellow-400" />
        ) : (
          <AiOutlineStar />
        )}
      </motion.button>

      <div className="absolute bottom-0 w-full p-4 z-20 shadowbackdrop">
        <div className="flex justify-between items-end gap-3">
          <h1 className="text-white text-lg font-semibold leading-tight flex-1 line-clamp-2">
            {movie.title || movie.name}
          </h1>

          <div className="flex-shrink-0">
            {(movie.vote_average || 0) > 7 ? (
              <div className="glass border border-green-400/30 px-3 py-1.5 rounded-lg">
                <span className="font-bold text-green-400 text-sm">
                  {(movie.vote_average || 0).toFixed(1)}
                </span>
              </div>
            ) : (movie.vote_average || 0) > 5.5 ? (
              <div className="glass border border-orange-400/30 px-3 py-1.5 rounded-lg">
                <span className="font-bold text-orange-400 text-sm">
                  {(movie.vote_average || 0).toFixed(1)}
                </span>
              </div>
            ) : (
              <div className="glass border border-red-400/30 px-3 py-1.5 rounded-lg">
                <span className="font-bold text-red-400 text-sm">
                  {(movie.vote_average || 0).toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>

        {movie.release_date && (
          <p className="text-gray-300 text-sm mt-2 opacity-80">
            {new Date(movie.release_date).getFullYear()}
          </p>
        )}
      </div>

      <Link
        to={`/moviedetail/${movie.id}`}
        className="h-full w-full absolute z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
      ></Link>

      <div>
        {movie.poster_path === null ? (
          <img className="img object-cover" src={noimage} />
        ) : (
          <LazyLoadImage
            effect="blur"
            className="img object-cover"
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          />
        )}
      </div>
    </motion.div>
  );
}

export default Moviecard;
