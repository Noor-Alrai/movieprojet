import React from "react";
export async function MoviesByType(type) {
    let endpoint;
    switch (type) {
      case "top_rated":
        endpoint = "top_rated";
        break;
      case "popular":
        endpoint = "popular";
        break;
        case "upcoming":
            endpoint="upcoming"
      
      default:
        endpoint = "now_playing";
    }
  
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1&api_key=bacc5cb7f37a366d5cd55cba74b43fe2`
    );
  
    const data = await response.json();
    return data.results;
  }