import React, { useEffect, useContext } from "react";
import Contextpage from "../Contextpage";
import Moviecard from "../components/Moviecard";
import { motion, AnimatePresence } from "framer-motion";
import TopHeader from "../components/TopHeader";
import { Helmet } from "react-helmet-async";

function Trending() {
  const {
    loader,
    loadingMore,
    page,
    setPage,
    fetchTrending,
    trending,
    setTrending,
    totalPage,
  } = useContext(Contextpage);

  useEffect(() => {
    setPage(1); // Reset Page to 1 on initial render.
    setTrending([]); // Clear trending movies on component mount
  }, []);

  useEffect(() => {
    if (page > 0) {
      fetchTrending();
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
      setTrending([]); // Clear trending movies when jumping to a specific page
      setPage(newPage);
    }
  };

  return (
    <>
      <Helmet>
        <title>MovieMate | Trending</title>
      </Helmet>

      <div className="w-full mb-20 md:mb-0">
        <TopHeader />

        <div className="px-6 py-4">
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
                  {trending.map((tred) => (
                    <Moviecard key={`${tred.id}-${page}`} movie={tred} />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls */}
          {!loader && trending.length > 0 && (
            <div className="flex flex-col items-center mt-8 space-y-4">
              {/* Load More Button */}
              {page < totalPage && (
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {loadingMore ? (
                    <>
                      <span className="loader-small"></span>
                      <span>Loading Trending...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      <span>Load More Trending</span>
                    </>
                  )}
                </button>
              )}

              {/* Page Info with Trending Icon */}
              <div className="text-gray-400 text-sm text-center flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Page {page} of {totalPage} • {trending.length} trending movies
                  loaded
                </span>
              </div>

              {page === totalPage && (
                <div className="text-green-400 text-sm flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>All trending movies loaded!</span>
                </div>
              )}

              {/* Traditional Pagination */}
              <div className="flex items-center space-x-2 flex-wrap justify-center">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={page === 1 || loadingMore}
                  className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  First
                </button>

                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1 || loadingMore}
                  className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                              ? "bg-red-600 text-white shadow-lg"
                              : "bg-gray-700 text-white hover:bg-red-600"
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
                  className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>

                <button
                  onClick={() => handlePageChange(totalPage)}
                  disabled={page === totalPage || loadingMore}
                  className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Last
                </button>
              </div>
            </div>
          )}

          {/* No Results Message */}
          {!loader && trending.length === 0 && (
            <div className="text-center py-10">
              <div className="text-gray-400 text-lg mb-2">
                No trending movies found
              </div>
              <div className="text-gray-500 text-sm">
                Check back later for the latest trending content
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Trending;
