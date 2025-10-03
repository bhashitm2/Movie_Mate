import React, { useEffect, useContext } from "react";
import Contextpage from "../Contextpage";
import Moviecard from "./Moviecard";
import { motion, AnimatePresence } from "framer-motion";
import Genre from "./Genre";
import TopHeader from "./TopHeader";

function Anime() {
  const {
    movies,
    loader,
    loadingMore,
    page,
    setPage,
    totalPage,
    setMovies,
    activegenre,
    fetchAnime,
  } = useContext(Contextpage);

  useEffect(() => {
    setPage(1); // Reset Page to 1 on initial render.
  }, []);

  useEffect(() => {
    setMovies([]); // Reset movies on genre change
    setPage(1); // Reset to page 1 instead of 0
  }, [activegenre]);

  useEffect(() => {
    if (page > 0) {
      fetchAnime(); // Fetch anime when page changes
    }
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPage && !loadingMore) {
      setPage(page + 1);
    }
  };

  const handlePageChange = (newPage) => {
    if (
      newPage !== page &&
      newPage >= 1 &&
      newPage <= totalPage &&
      !loadingMore
    ) {
      setMovies([]); // Clear movies when jumping to a specific page
      setPage(newPage);
    }
  };

  return (
    <div className="w-full mb-20 md:mb-0">
      <TopHeader />

      <div className="px-6 py-4">
        <Genre />

        <motion.div
          layout
          className="flex flex-wrap relative justify-evenly md:justify-around"
        >
          <AnimatePresence>
            {loader ? (
              <div className="w-full flex justify-center py-10">
                <span className="loader"></span>
              </div>
            ) : (
              <div className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around">
                {movies.map((movie) => (
                  <Moviecard key={`${movie.id}-${page}`} movie={movie} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Controls */}
        {!loader && movies.length > 0 && (
          <div className="flex flex-col items-center mt-8 space-y-4">
            {/* Load More Button */}
            {page < totalPage && (
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {loadingMore ? (
                  <>
                    <span className="loader-small"></span>
                    <span>Loading Anime...</span>
                  </>
                ) : (
                  "Load More Anime"
                )}
              </button>
            )}

            {/* Page Info */}
            <div className="text-gray-400 text-sm text-center">
              Page {page} of {totalPage} • {movies.length} anime loaded
              {page === totalPage && (
                <div className="text-green-400 mt-1">All anime loaded!</div>
              )}
            </div>

            {/* Traditional Pagination */}
            <div className="flex items-center space-x-2 flex-wrap justify-center">
              <button
                onClick={() => handlePageChange(1)}
                disabled={page === 1 || loadingMore}
                className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                First
              </button>

              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1 || loadingMore}
                className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPage) }, (_, i) => {
                  const pageNum =
                    Math.max(1, Math.min(totalPage - 4, page - 2)) + i;
                  if (pageNum <= totalPage) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loadingMore}
                        className={`px-3 py-2 rounded transition-colors ${
                          pageNum === page
                            ? "bg-purple-600 text-white"
                            : "bg-gray-700 text-white hover:bg-gray-600"
                        } disabled:opacity-50`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPage || loadingMore}
                className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>

              <button
                onClick={() => handlePageChange(totalPage)}
                disabled={page === totalPage || loadingMore}
                className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Last
              </button>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!loader && movies.length === 0 && (
          <div className="text-center py-10">
            <div className="text-gray-400 text-lg">No anime found</div>
            <div className="text-gray-500 text-sm mt-2">
              Try changing the genre or check back later
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Anime;
