import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
//import App from './App';
//import { Provider } from 'react-redux';
//import store from "./redux/store";
import MovieList from "./movies/index"

export default function Home() {
  return (
    <div>
      <MovieList/>
    </div>
  )
}