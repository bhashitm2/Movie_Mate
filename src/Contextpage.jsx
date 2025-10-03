import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//=== google firebase import start ===
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// ===================================
import { toast } from "react-toastify";

const Contextpage = createContext();

export function MovieProvider({ children }) {
  const [header, setHeader] = useState("Trending");
  const [totalPage, setTotalPage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [page, setPage] = useState(1);
  const [activegenre, setActiveGenre] = useState(28);
  const [genres, setGenres] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // New state for pagination loading
  const [backgenre, setBackGenre] = useState(false);
  const [user, setUser] = useAuthState(auth); //=======> firebase custom hooks state
  const navigate = useNavigate();

  const APIKEY = import.meta.env.VITE_API_KEY;

  // Handle redirect result when user returns from Google sign-in
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          toast.success("Login successfully");
          navigate("/");
        }
      } catch (error) {
        console.log("Redirect error:", error);
        if (error.code !== "auth/popup-closed-by-user") {
          toast.error("Login failed");
        }
      }
    };

    handleRedirectResult();
  }, [navigate]);

  useEffect(() => {
    if (page < 1) {
      setPage(1); // Increment page to 1 if it is less than 1.
    }
  }, [page]);

  const filteredGenre = async () => {
    try {
      // Set appropriate loading state
      if (page === 1) {
        setLoader(true);
      } else {
        setLoadingMore(true);
      }

      const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${activegenre}&api_key=${APIKEY}&page=${page}&sort_by=popularity.desc`;

      const data = await fetch(url);
      const filteredGenreData = await data.json();

      // Handle first page vs subsequent pages
      if (page === 1) {
        setMovies(filteredGenreData.results); // Replace movies for first page
      } else {
        setMovies((prevMovies) => [
          ...prevMovies,
          ...filteredGenreData.results,
        ]); // Append for subsequent pages
      }

      setTotalPage(filteredGenreData.total_pages);
      setHeader("Genres");
    } catch (error) {
      console.error("Error fetching filtered genre:", error);
      toast.error("Error loading movies");
    } finally {
      setLoader(false);
      setLoadingMore(false);
    }
  };

  const fetchSearch = async (query) => {
    try {
      setLoader(true);
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&with_origin_country=IN&language=en-US&query=${query}&page=1&include_adult=true`
      );
      const searchmovies = await data.json();
      setSearchedMovies(searchmovies.results);
      setHeader(`Results for "${query}"`);
    } catch (error) {
      console.error("Error searching movies:", error);
      toast.error("Error searching movies");
    } finally {
      setLoader(false);
    }
  };

  const fetchAnime = async () => {
    try {
      if (page === 1) {
        setLoader(true);
      } else {
        setLoadingMore(true);
      }

      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${activegenre}&api_key=${APIKEY}&with_keywords=210024|287501&page=${page}`
      );
      const filteredGenreData = await data.json();

      if (page === 1) {
        setMovies(filteredGenreData.results);
      } else {
        setMovies((prevMovies) => [
          ...prevMovies,
          ...filteredGenreData.results,
        ]);
      }

      setTotalPage(filteredGenreData.total_pages);
      setHeader("Anime");
    } catch (error) {
      console.error("Error fetching anime:", error);
      toast.error("Error loading anime movies");
    } finally {
      setLoader(false);
      setLoadingMore(false);
    }
  };

  const fetchGenre = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&with_origin_country=IN&language=en-US`
      );
      const gen = await data.json();
      setGenres(gen.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchTrending = async () => {
    try {
      if (page === 1) {
        setLoader(true);
      } else {
        setLoadingMore(true);
      }

      const data = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}&with_origin_country=IN&page=${page}`
      );
      const trend = await data.json();

      if (page === 1) {
        setTrending(trend.results);
      } else {
        setTrending((prevTrending) => [...prevTrending, ...trend.results]);
      }

      setTotalPage(trend.total_pages);
      setHeader("Trending Movies");
    } catch (error) {
      console.error("Error fetching trending:", error);
      toast.error("Error loading trending movies");
    } finally {
      setLoader(false);
      setLoadingMore(false);
    }
  };

  const fetchUpcoming = async () => {
    try {
      if (page === 1) {
        setLoader(true);
      } else {
        setLoadingMore(true);
      }

      const data = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&with_origin_country=IN&language=en-US&page=${page}`
      );
      const upc = await data.json();

      if (page === 1) {
        setUpcoming(upc.results);
      } else {
        setUpcoming((prevUpcoming) => [...prevUpcoming, ...upc.results]);
      }

      setTotalPage(upc.total_pages);
      setHeader("Upcoming Movies");
    } catch (error) {
      console.error("Error fetching upcoming:", error);
      toast.error("Error loading upcoming movies");
    } finally {
      setLoader(false);
      setLoadingMore(false);
    }
  };

  // create local storage
  const GetFavorite = () => {
    setLoader(false);
    setHeader("Favorite Movies");
  };

  //<========= firebase Google Authentication ========>
  const googleProvider = new GoogleAuthProvider();
  // Configure Google provider to help with COOP issues
  googleProvider.setCustomParameters({
    prompt: "select_account",
  }); // =====> google auth provide

  const GoogleLogin = async () => {
    try {
      // Try popup first
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/");
      toast.success("Login successfully");
    } catch (err) {
      console.log("Popup error:", err);

      // If popup fails due to COOP or other restrictions, try redirect
      if (
        err.code === "auth/popup-blocked" ||
        err.code === "auth/cancelled-popup-request" ||
        err.message.includes("popup") ||
        err.message.includes("Cross-Origin-Opener-Policy")
      ) {
        try {
          toast.info("Redirecting to Google sign-in...");
          await signInWithRedirect(auth, googleProvider);
          // The redirect result will be handled in the useEffect above
        } catch (redirectErr) {
          console.log("Redirect error:", redirectErr);
          toast.error("Login failed");
          navigate("/");
        }
      } else if (err.code !== "auth/popup-closed-by-user") {
        toast.error("Login failed");
        navigate("/");
      }
    }
  };
  // <==========================================================>

  return (
    <Contextpage.Provider
      value={{
        fetchGenre,
        genres,
        setGenres,
        filteredGenre,
        header,
        setHeader,
        movies,
        setMovies,
        page,
        setPage,
        activegenre,
        setActiveGenre,
        fetchSearch,
        fetchAnime,
        loader,
        setBackGenre,
        backgenre,
        setLoader,
        loadingMore, // Add this to context
        fetchTrending,
        trending,
        setTrending, // Add this to context
        fetchUpcoming,
        upcoming,
        setUpcoming, // Add this to context
        GetFavorite,
        totalPage,
        searchedMovies,
        GoogleLogin,
        user,
      }}
    >
      {children}
    </Contextpage.Provider>
  );
}

export default Contextpage;
