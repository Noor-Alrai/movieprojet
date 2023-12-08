import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react'
import Navbar from "../Navbar";
import FinalFooter from "@/components/FinalFooter";
//import Footer from "../Footer";



const SinglePageMovie = () => {
    const [moiveData , setMovieData ] = useState({})
    const [movieCast , setMovieCast] = useState({})
    const [movieTrailer , setMovieTrailer] = useState({})
    const [movieSimiler, setmovieSimiler] = useState({})



    const router = useRouter()
    const currentId = router.query.id
    //console.log(currentId)

    
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2I5Y2Y0ZDRmZGFjZTJlZTUxZDhhOWVkODJlYjU2OCIsInN1YiI6IjY1NmUyZmU1NTY4NDYzMDEzMGExMTUyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EgaNc5RGe2tTbIkaE5oSVj7jYseWUqKhzjVsWFMFPoo'
        }
      };
      
      //fetching for details 
     
      useEffect(() => {
        


        //fetching for cast 
        const fetchCast = async () => {
          
        fetch(`https://api.themoviedb.org/3/movie/${currentId}/credits?language=en-US`, options)
        .then(response => response.json())
        .then(response => setMovieCast(response))
        .catch(err => console.error(err));
        }
        fetchCast()

        //fetch for trailer
        const fetchTrailer = async () => {
          
        fetch(`https://api.themoviedb.org/3/movie/${currentId}/videos?language=en-US`, options)
        .then(response => response.json())
        .then(response => setMovieTrailer(response))
        .catch(err => console.error(err));
        }
        fetchTrailer()

        //fetchin simelaer

        const similerMovie = async() =>{
          fetch(`https://api.themoviedb.org/3/movie/${currentId}/similar?language=en-US&page=1`, options)
          .then(response => response.json())
          .then(response => setmovieSimiler(response))
          .catch(err => console.error(err));
        }
        similerMovie()

        fetch(`https://api.themoviedb.org/3/movie/${currentId}?language=en-US`, options)
        .then(response => response.json())
        .then(response => setMovieData(response))
        .catch(err => console.error(err));



      })

      //console.log(movieTrailer)

      const firstTrailerKey = movieTrailer.results?.find(item => item.type === 'Trailer');
      const key = firstTrailerKey ? firstTrailerKey.key : null;

      //console.log(key);
      //console.log(trailerKeys)
      
      if (moiveData && movieCast){
        const mainCast = movieCast.cast?.slice(0, 5)
        const mainSimiler = movieSimiler.results?.slice(0, 4)
        return (
          <>
          <Navbar />
          
          <div class="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
        
          <div class="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
            <img class="w-full" src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${moiveData.poster_path}`}
              alt={moiveData.original_title} 
              />
            <a href={`https://www.themoviedb.org/video/play?key=${key}`} class="text-sm leading-none text-gray-600 dark:text-gray-300 font-semibold ">Movie Trailer</a>        
                            
              <iframe
                  width="560"
                  height="315"
                  src={`https://www.themoviedb.org/video/play?key=${key}`}
                  title="YouTube Video"
                  frameBorder="0"
                  allowFullScreen
              ></iframe>
          </div>
        
          <div class="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
            <div class="border-b border-gray-700 pb-6">
              <h1 class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-300 dark:text-white mt-2">{moiveData.original_title}</h1>
            </div>
            
            <div class="py-4 border-b border-gray-700 flex items-center justify-between">
              <p class="text-base leading-4 text-gray-800 dark:text-gray-300">{moiveData.overview}</p>
            </div>
            
            <div>
              <p class="xl:pr-48 text-lg lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7 font-semibold">Relesed Date: {moiveData.release_date}</p>
              <p class="xl:pr-48 text-lg lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7 font-semibold">Production Companies: </p>

              
                      {
                        moiveData.production_companies?.map((com) => (
                          <li class = "list-none ">
                              <p class="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">{com.name}</p>
                          </li>
                          ))
                      }
            </div>
            <div>
              <p class="text-lg leading-4 mt-7 text-gray-600 dark:text-gray-300">Runtime : {moiveData.runtime}</p>
              <p class="text-lg leading-4 mt-7 text-gray-600 dark:text-gray-300 font-semibold">Langugaes:</p>

              
                    {
                        moiveData.spoken_languages?.map((com) => (
                          <li class = "list-none">
                              <p class="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">{com.name}</p>
                          </li>
                          ))
                    }
              <p class="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Vote Average: {moiveData.vote_average} <strong>Vote Count: {moiveData.vote_count}</strong></p>
            </div>
          </div>
        </div>
      <div class="max-w-2xl mx-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold leading-none text-gray-700 dark:text-white">Main Cast</h3>
        </div>
        <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            { mainCast?.map((cast) => (
            <li class="py-3 sm:py-4">
              <a href={`/Actors/${encodeURIComponent(cast.id)}`}>
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${cast.profile_path}`}
                        alt={cast.original_title} class="w-full h-48 rounded-md object-cover"/>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {cast.name}
                        </p>
                    </div>
                </div>
                </a>
            </li>
            
            ))
        }
        </ul>
        </div>
      </div>

      <div class="items-center text-center" >
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
      <h3 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Similer Movies To Watch</h3>

      <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-40">
        {mainSimiler?.map((movie) =>
        (
          <div className='flex items-center justify-center h-screen bg-[#0d1829]  '>
            <div className=' mx-auto bg-white rounded-3xl shadow-xl'>
              <div className="grid rounded-3xl max-w-sm shadow-sm bg-slate-100  flex-col">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  width="390"
                  height="200"
                  className="rounded-t-3xl justify-center grid h-80 object-cover"
                  alt="movie.title"
                />

                <div className="group p-6 grid z-10">
                  <a
                    href={`/movies/${encodeURIComponent(movie.id)}`}
                    className="group-hover:text-cyan-700 font-bold sm:text-2xl line-clamp-2"
                  >
                    {movie.title}
                  </a>
                  <span className="text-slate-400 pt-2 font-semibold">


                  </span>
                  <div className="h-28">
                    <span className="line-clamp-4 py-2 text-base font-light leading-relaxed">
                      {movie.overview}

                    </span>
                  </div>
                  <div className=" grid-cols-2 flex group justify-between">
                    <div className="font-black flex flex-col">
                      <span className="text-yellow-500 text-xl">{movie.release_date}
                      </span>
                      <span className="text-3xl flex gap-x-1 items-center group-hover:text-yellow-600">{movie.vote_average}

                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                          <g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#eab308" /> </g>

                        </svg>
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="h-7" />
                      <span className="text-3xl  font-bold  gap-x-2 text-slate-300">
                        {movie.vote_count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
      
    </div>

    <FinalFooter />
      </>

        )
      }

      
    
}
export default SinglePageMovie