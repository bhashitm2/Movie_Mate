import React, { useEffect, useContext } from "react";
import Contextpage from "../Contextpage";
import Movies from "../components/Movies";
import TopHeader from "../components/TopHeader";
import { useParams } from "react-router-dom";
import Search from "../pages/Search";

function Container() {
  const { setMovies } = useContext(Contextpage);
  const { query } = useParams();
  return (
    <section>
      <TopHeader />
      <div className="px-6 py-4">
        {query ? <Search query={query} /> : <Movies />}
      </div>
    </section>
  );
}

export default Container;
