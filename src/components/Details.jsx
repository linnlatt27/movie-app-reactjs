import React , {useEffect} from 'react'
import { Card , Spinner} from "flowbite-react";
import { useNavigate, useParams } from 'react-router';
import {api, api_key } from '../api/api';
import {removeSelectedMovie, selectMovie} from "../redux/action/movies";
import { useDispatch , useSelector } from 'react-redux';

const Details = () => {

  const {movieId} = useParams();

  const dispatch = useDispatch();

  const movieDetail = async() => {
    const res = await api.get(`/movie/${movieId}?api_key=${api_key}`)
    dispatch(selectMovie(res.data))
  }

  useEffect(()=>{
   if(movieId) {
    movieDetail();
   }

   return() => dispatch(removeSelectedMovie({}))
  },[]);

  let movie = useSelector((state)=>state.movies.movie)
  

  const navigate = useNavigate();
  return (
    <div className='container mx-auto'>
      <div className='text-center'>
        <span className='my-2' onClick={()=>navigate('/')}>
        <i className="fa-solid fa-arrow-left-long"></i>Back
        </span>
      </div>

      {
        JSON.stringify(movie) == '{}' ? (
          <div className='text-center'>
           <h1>
           <Spinner aria-label="Extra large spinner example" size="xl" />
           </h1>
          </div>
        ) : (
          <div className='max-h-50'>
        <Card
      className="max-w-md mx-auto"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       {movie.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {movie.overview}
      </p> 
      <div>
        <span className='bg-black text-white rounded-xl p-3'>
        <i className="fa-solid fa-star me-2"></i>{movie.vote_average}
        </span >
        
        <span className='bg-black text-white rounded-xl p-3 ms-2'>
        <i className="fa-solid fa-calendar-days me-2"></i>{movie.release_date}
        </span>

        <span className='bg-black text-white rounded-xl p-3 ms-2'>
       <i className="fa-solid fa-users me-2"></i>{movie.vote_count}
        </span>

        <div className='mt-8'>
        <span className='bg-black text-white rounded-xl p-3'>
        <i className="fa-solid fa-earth-americas me-2"></i>{movie.production_countries[0].name}
        </span>
        </div>
      </div>
    </Card>
      </div>
        )
      }

    </div>
  )
}

export default Details
