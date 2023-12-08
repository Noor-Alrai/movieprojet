import React, { useState, useEffect } from "react";
import Link from "next/link";

const ActorList = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://api.themoviedb.org/3/person/popular?language=en-US&page=1';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmY4NThjNjhmZDM2MzkyYzc4YzhhOWNmNTMxMTI3MSIsInN1YiI6IjY1NjRjMTRjZWRlYjQzMDExZDVhMzcxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Cc9AYZcT1aXwsWDYpfqJGJXStJfPgHHiMiv5icr7lck'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setActors(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <h1>Actor List</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {actors.map((actor) => (
          <li key={actor.id} style={{ margin: '10px', textAlign: 'center' }}>
            <Link href={`/actors/${actor.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt={actor.name}
                />
                <strong>{actor.name}</strong>
            </Link>
            <p>
              {actor.known_for.map((work) => (
                <span key={work.id}>
                  {work.original_title || work.original_name}
                  {', '}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActorList;
