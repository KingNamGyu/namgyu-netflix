import React, { useEffect } from "react";
import { MovieAction } from "../redux/actions/MovieAction";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../component/Banner";
import MovieSlide from "../component/MovieSlide";
import { Container } from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upComingMovies } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(MovieAction.getMovies());
  }, [dispatch]);

  return (
    <div>
      <div>
      {popularMovies.results && <Banner movie={popularMovies.results[0]} />}
      </div>

      <Container>
        <h1 className="title-bold">Popular Movies</h1>
        <MovieSlide movies={popularMovies} videoType="movie" />
        <h1 className="title-bold">Top Rated Movies</h1>
        <MovieSlide movies={topRatedMovies} videoType="movie" />
        <h1 className="title-bold">Upcoming Movies</h1>
        <MovieSlide movies={upComingMovies} videoType="movie" />
      </Container>
    </div>
  );
};

export default Home;
