import React, { useRef } from 'react'
import { Navbar , TextInput } from "flowbite-react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { api , api_key } from '../api/api';
import { fetchMovies } from '../redux/action/movies';

const Header = () => {
  const movieName = useRef('')

  const dispatch = useDispatch('')

  const searchMovie = async() => {
    if(movieName.current.value !== '') {
      const res = await api.get(`/search/movie?query=${movieName.current.value}&api_key=${api_key}`)
      dispatch(fetchMovies(res.data.results))
    }
    else {
      const res = await api.get(`/movie/now_playing?api_key=${api_key}`)
      dispatch(fetchMovies(res.data.results))
    }
  }
  return (
    <div>
  <Navbar fluid rounded>
      <Link to='/'><span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        CODE LAB MOVIE CHANNEL</span></Link>
      <div className="flex items-center justify-center">
       <TextInput placeholder='Search..' ref={movieName}/>
       <button type='button' onClick={()=>searchMovie()} className='bg-gray-900 text-white p-3 rounded-xl ms-1'>Search</button>
      </div>
    </Navbar>
    </div>
  )
}

export default Header
