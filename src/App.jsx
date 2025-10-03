import "react-toastify/dist/ReactToastify.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./Contextpage";
import { ToastContainer } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";
import logo from "./assets/images/logo.png";

const Container = lazy(() => import("./pages/Container"));
const Login = lazy(() => import("./auth/Login"));
const Trending = lazy(() => import("./pages/Trending"));
const Upcoming = lazy(() => import("./pages/Upcoming"));
const Favorite = lazy(() => import("./pages/Favoritepage"));
const Player = lazy(() => import("./pages/Player"));
const Anime = lazy(() => import("./components/Anime"));
const Detail = lazy(() =>
  import("./components/Detail").then((module) => ({ default: module.Detail }))
);

function App() {
  return (
    <HelmetProvider>
      <MovieProvider>
        <Helmet>
          <meta property="og:image" content={logo} />
        </Helmet>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="dark"
        />

        <Navbar />
        <div className="md:ml-[16rem] min-h-screen">
          <Suspense
            fallback={
              <div className="flex h-full min-h-[60vh] items-center justify-center text-white">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Container />} />
              <Route path="/login" element={<Login />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="/moviedetail/:id" element={<Detail />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/player/:id/:title" element={<Player />} />
              {/*Route-1 For Player, Title is just for beauty of url, it is not used anywhere.*/}
              <Route path="/player/:id" element={<Player />} />
              {/*Route-2 For Player. Movie still available even if someone removes Title from end of the url.*/}
              <Route path="/anime" element={<Anime />} />
              <Route path="/search/:query" element={<Container />} />
              <Route path="/search/anime/:query" element={<Container />} />
              <Route path="/search/" element={<Container />} />
            </Routes>
          </Suspense>
        </div>
      </MovieProvider>
    </HelmetProvider>
  );
}

export default App;
