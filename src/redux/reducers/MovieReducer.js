const initialState = {
  popularMovies: [],
  topRatedMovies: [],
  upComingMovies: [],
  genreList: [],
  videoDetail: [],
  videoRecommend: [],
  videoYoutube: [],
};

function MovieReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_MOVIES_REQUEST":
      return { ...state };
    case "GET_MOVIES_SUCCESS":
      return {
        ...state,
        popularMovies: payload.popularMovies,
        topRatedMovies: payload.topRatedMovies,
        upComingMovies: payload.upComingMovies,
        genreList: payload.genreList,
      };
    case "GET_MOVIE_FAILURE":
      return { ...state };

    case "GET_DETAIL_REQUEST":
      return { ...state };
    case "VIDEO_DETAIL_SUCCESS":
      return {
        ...state,
        videoDetail: action.payload.videoDetail,
      };
    case "GET_DETAIL_FAILURE":
      return { ...state };

    case "GET_RECOMMEND_REQUEST":
      return { ...state };
    case "VIDEO_RECOMMEND_SUCCESS":
      return {
        ...state,
        videoRecommend: action.payload.videoRecommend,
      };
    case "GET_RECOMMEND_FAILURE":
      return { ...state };

    case "GET_YOUTUBE_REQUEST":
      return { ...state };
    case "VIDEO_YOUTUBE_SUCCESS":
      return {
        ...state,
        videoYoutube: action.payload.videoYoutube,
      };
    case "GET_YOUTUBE_FAILURE":
      return { ...state };

    default:
      return { ...state };
  }
}

export default MovieReducer;
