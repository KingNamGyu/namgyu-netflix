import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MovieAction } from "../redux/actions/MovieAction";
import { Badge, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPlay,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "@mui/material/Modal";
import YouTube from "react-youtube";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieDetail = () => {
  const settings = {
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const params = useParams();
  const dispatch = useDispatch();
  const { videoDetail, videoRecommend, videoYoutube, genreList } = useSelector(
    (state) => state.movie
  );

  const navigate = useNavigate();

  const goLink = (videoType, id) => {
    navigate(`/${videoType}/${id}`);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    dispatch(MovieAction.videoYoutube(params.videoType, params.id));
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const youtubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    dispatch(MovieAction.videoDetail(params.videoType, params.id));
    dispatch(MovieAction.videoRecommend(params.videoType, params.id));
    dispatch(MovieAction.videoYoutube(params.videoType, params.id));
  }, [dispatch, params.id, params.videoType]);

  return (
    <div>
      <div
        className="detail-back-img"
        style={{
          backgroundImage:
            "url(" +
            `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${videoDetail.backdrop_path}` +
            ")",
        }}
      >
        <div>
          <img
            className="detail-img"
            src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${videoDetail.poster_path}`}
            alt=""
          />
        </div>
        <div className="title">
          {videoDetail.title ? videoDetail.title : videoDetail.name}

          <span className="date">
            {videoDetail.release_date &&
              videoDetail.release_date.substring(0, 4)}
          </span>

          <div className="genres">
            {videoDetail.genres &&
              videoDetail.genres.map((item) => (
                <Badge pill bg="danger">
                  <span className="genres1" key={item.id}>
                    {item.name}
                  </span>
                </Badge>
              ))}
          </div>
          <div className="genres2">
            <div className="vote_average">
              <FontAwesomeIcon className="faStar" icon={faStar} />
              <div className="average-margin">{videoDetail.vote_average}</div>
            </div>

            <div className="popularity">
              <FontAwesomeIcon className="faUsers" icon={faUsers} />
              <div className="popularity-margin">{videoDetail.popularity}</div>
            </div>

            <div className="runtime">
              <FontAwesomeIcon className="faClock" icon={faClock} />
              <div className="runtime-margin">
                {" "}
                {videoDetail.runtime ? videoDetail.runtime + "m" : ""}
              </div>
            </div>
            <div className="adult">
              {videoDetail.adult ? "청불" : "Under 18"}
            </div>
          </div>
          <div className="overview">{videoDetail.overview}</div>
          <div className="btnWrap">
            <div onClick={handleOpen}>
              <FontAwesomeIcon icon={faPlay} className="faPlay" /> Trailer
            </div>
          </div>
        </div>
      </div>
      <Container className="Carousel-div">
        <h1 className="Recommend">Recommend</h1>
        <div>
          <Slider {...settings}>
            {videoRecommend.map((item, index) => (
              <img
                className="Carousel-img"
                key={index}
                onClick={() => goLink(params.videoType, item.id)}
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
                alt=""
              />
            ))}
          </Slider>
        </div>
      </Container>
      <Modal
        className="youtube"
        open={open}
        onClose={handleClose}
        aria-describedby="parent-modal-description"
        aria-labelledby="parent-modal-title"
      >
        <div>
          <YouTube
            videoId={
              videoYoutube[0] &&
              videoYoutube.filter((item) => item.type === "Trailer")[0].key
            }
            opts={youtubeOpts}
            className={"youtube"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MovieDetail;


