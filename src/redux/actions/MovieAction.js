import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;
function getMovies() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "GET_MOVIES_REQUEST" });
      const popularMovieApi = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US`
      );

      const topRatedApi = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US`
      );

      const upComingApi = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US`
      );

      const genreApi = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      

      const [popularMovies, topRatedMovies, upComingMovies, genreList] =
        await Promise.all([
          popularMovieApi,
          topRatedApi,
          upComingApi,
          genreApi,
        ]);

      dispatch({
        type: "GET_MOVIES_SUCCESS",
        payload: {
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upComingMovies: upComingMovies.data,
          genreList: genreList.data.genres,
        },
      });
    } catch (error) {
      
      dispatch({ type: "GET_MOVIE_FAILURE" });
    }
  };
}
const videoDetail = (videoType, id) => {
  return async (dispatch, getState) => {
    try{
      dispatch({ type: "GET_DETAIL_REQUEST" });
    const vedeoDetailApi = api.get(
      `${videoType}/${id})?api_key=${API_KEY}&language=en-US`
    );
    const [videoDetail] = await Promise.all([vedeoDetailApi]);
    dispatch({
      type: "VIDEO_DETAIL_SUCCESS",
      payload: {
        videoDetail: videoDetail.data,
      },
    }) 
    }  catch (error) {  
      dispatch({ type: "GET_DETAIL_FAILURE" });
    }
  } 
};
const videoRecommend = (videoType, id) => {
  return async (dispatch, getState) => {
    try{
      dispatch({ type: "GET_RECOMMEND_REQUEST" });
    const vedeoRecommendApi = api.get(
      `${videoType}/${id})/recommendations?api_key=${API_KEY}&language=en-US&page=1`
    );
    const [videoRecommend] = await Promise.all([vedeoRecommendApi]);
    dispatch({
      type: "VIDEO_RECOMMEND_SUCCESS",
      payload: {
        videoRecommend: videoRecommend.data.results,
      },
    });   
     } catch (error) {  
      dispatch({ type: "GET_RECOMMEND_FAILURE" });
    }
  };
};
const videoYoutube = (videoType, id) => {
  return async (dispatch, getState) => {
    try{
      dispatch({ type: "GET_YOUTUBE_REQUEST" });
    const videoYoutubeApi = api.get(
      `${videoType}/${id})/videos?api_key=${API_KEY}&language=en-US&page=1`
    );
    const [videoYoutube] = await Promise.all([videoYoutubeApi]);
    dispatch({
      type: "VIDEO_YOUTUBE_SUCCESS",
      payload: {
        videoYoutube: videoYoutube.data.results,
      },
    });
    } catch (error) {  
      dispatch({ type: "GET_YOUTUBE_FAILURE" });
    }
  };
};
export const MovieAction = {
  getMovies,
  videoDetail,
  videoRecommend,
  videoYoutube,
};
