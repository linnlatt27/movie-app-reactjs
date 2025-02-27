import React , { useEffect } from 'react'
import Movies from './Movies'
import { useDispatch } from 'react-redux';
import { fetchMovies } from "../redux/action/movies"
import { api, api_key } from '../api/api';

const Home = () => {
  const dispatch = useDispatch()

  const getMovies = async() => {
    const res = await api.get(`/movie/now_playing?api_key=${api_key}`)
    dispatch(fetchMovies(res.data.results))
  }

  useEffect(()=>{
     getMovies()
  },[]);

  return (
    <div>
      <Movies/>
    </div>
  )
}

export default Home
