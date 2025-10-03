import React, { useEffect, useContext } from "react";
import Contextpage from "../Contextpage";
import Moviecard from "../components/Moviecard";
import { motion, AnimatePresence } from "framer-motion";
import TopHeader from "../components/TopHeader";
import { Helmet } from "react-helmet-async";

function Upcoming() {
  const {
    loader,
    loadingMore,
    setPage,
    page,
    fetchUpcoming,
    upcoming,
    setUpcoming,
    totalPage,
  } = useContext(Contextpage);

  useEffect(() => {
    setPage(1); // Reset Page to 1 on initial render.
    setUpcoming([]); // Clear upcoming movies on component mount
  }, []);

  useEffect(() => {
    if (page > 0) {
      fetchUpcoming();
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
      setUpcoming([]); // Clear upcoming movies when jumping to a specific page
      setPage(newPage);
    }
  };

  return (
    <>
      <Helmet>
        <title>MovieMate | Upcoming movies</title>
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
                  {upcoming.map((upc) => (
                    <Moviecard key={`${upc.id}-${page}`} movie={upc} />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls */}
          {!loader && upcoming.length > 0 && (
            <div className="flex flex-col items-center mt-8 space-y-4">
              {/* Load More Button */}
              {page < totalPage && (
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {loadingMore ? (
                    <>
                      <span className="loader-small"></span>
                      <span>Loading Upcoming...</span>
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Load More Upcoming</span>
                    </>
                  )}
                </button>
              )}

              {/* Page Info with Calendar Icon */}
              <div className="text-gray-400 text-sm text-center flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  Page {page} of {totalPage} • {upcoming.length} upcoming movies
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
                  <span>All upcoming movies loaded!</span>
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
                              ? "bg-green-600 text-white shadow-lg"
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

              {/* Coming Soon Badge */}
              <div className="flex items-center space-x-2 bg-green-900/30 px-4 py-2 rounded-full border border-green-600/30">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM4.343 12.344l1.414 1.414L9.5 9.5M12 6V4m6.364 1.636l-1.414 1.414M20 12h-2M6.364 6.364L4.95 4.95M4 12H2m6.364 6.364l1.414-1.414M12 20v-2"
                  />
                </svg>
                <span className="text-green-400 text-sm font-medium">
                  Coming Soon to Theaters
                </span>
              </div>
            </div>
          )}

          {/* No Results Message */}
          {!loader && upcoming.length === 0 && (
            <div className="text-center py-10">
              <div className="text-gray-400 text-lg mb-2">
                No upcoming movies found
              </div>
              <div className="text-gray-500 text-sm">
                Check back later for the latest upcoming releases
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Upcoming;
