import React from "react";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";

const MovieSlide = ({ movies, videoType }) => {
  const navigate = useNavigate();
  const goLink = (videoType, id) => {
    navigate(`/${videoType}/${id}`);
  };

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Container>
      <Slider {...settings}>
        {movies.results &&
          movies.results.map((item, index) => (
            <div key={index} onClick={() => goLink(videoType, item.id)}>
              <MovieCard item={item} />
            </div>
          ))}
      </Slider>
    </Container>
  );
};

export default MovieSlide;
