import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

function Navbar({ onSearch, onSelectType, onSelectGenre }) {
  const [genres, setGenres] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    onSearch(e.target.value)
  }

  const router = useRouter()

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWNjNWNiN2YzN2EzNjZkNWNkNTVjYmE3NGI0M2ZlMiIsInN1YiI6IjY1Njc3NjZjMDIxY2VlMDEzYTg0MzMxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AzZZFUx9YA3TyFD4o86SQE1mY1CwZkk5Kx09BfWQZPY",
      },
    }
    console.log("Noor")

    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((response) => response.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error(error))
  }, [])

  return (
    <section class="relative mx-auto">
      <nav class="flex justify-between bg-teal-500 text-white w-screen">
        <div class="px-5 xl:px-12 py-6 flex w-full items-center">
          <a class="text-3xl font-bold font-heading h-12 w-auto italic  bg-gradient-to-r from-white to-teal-300 text-transparent bg-clip-text" href="/">YouMove
            <img
              className=" max-h-8 h-full"
              style={{ maxHeight: "100%" }}
              src="https://icons.iconarchive.com/icons/designbolts/free-multimedia/512/Film-icon.png"
            />
          </a>
          <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            <li>
              <div className="movie-links hover:text-gray-200 bg-teal-500">
                <select
                  class="hover:text-gray-200 italic bg-teal-500"
                  id="genre"
                  onChange={(e) => onSelectGenre(e.target.value)}
                >
                  <option value="">Genre</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>
            </li>

            <li>
              <div className="movie-links hover:text-gray-200 italic bg-teal-500" href="/Movies" 
              
              >
                <select
                
                  value=""
                  onChange={(e) => onSelectType(e.target.value)}
                  class="bg-teal-500"
                > 
              
                
                  <option value="" >Movies</option>
                  <option value="top_rated">Top Rated</option>
                  <option value="popular">Popular</option>
                  <option value="upcoming">Up Coming</option>
                  <option value="now_playing">Now Playing</option>
                </select>
              </div>
            </li>
            <li>
              <a class="hover:text-gray-200 italic" href="/Actors">
                Actors
              </a>
            </li>
            <li>
              {" "}
              <input
                class="h-6 rounded-lg text-center text-black"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </li>
          </ul>
        </div>

        <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 hover:text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </a>
      </nav>
    </section>
  )
}
export default Navbar
