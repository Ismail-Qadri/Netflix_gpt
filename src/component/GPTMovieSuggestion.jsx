// import { useSelector } from "react-redux";

// import MovieList from "./MovieList";

// const GPTMovieSuggestion = ({ setGradient }) => {
//   const gpt = useSelector((store) => store.gpt);
//   const { movieNames, movieList } = gpt;

//   if (movieNames) {
//     setGradient(true);
//   } else {
//     setGradient(false);
//   }

//   if (!movieNames) return null;

//   return (
//     <>
//       <div className=" ">
//         <div className=" text-white h-full bg-opacity-50">
//           {movieNames.map((movieName, index) => (
//             <MovieList
//               key={movieName}
//               title={movieName}
//               movies={movieList[index]}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default GPTMovieSuggestion;



import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList'; // Assuming MovieList is a component that displays movie details

const GPTMovieSuggestion = () => {
  const { movieNames, movieList } = useSelector((store) => store.gpt);

  if (!movieNames || !movieList) return null; // If no results, do not render

  return (
    <div className="p-1 md:m-3 text-white bg-black bg-opacity-80">
      <div>
        {movieNames.map((movieName, idx) => (
          <MovieList key={idx} title={movieName} movies={movieList[idx]} />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestion;
