import React, { useEffect} from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGptMovieResults } from "../Utils/gptSlice"; // Redux action for dispatching results
import { API_OPTIONS } from "../Utils/constant"; // Your TMDB API options

const GPTSearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize Gemini API with your API key from .env
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);

  const listModels = async () => {
    try {
      const models = await genAI.listModels();
      console.log("Available models:", models); // Logs all available models
    } catch (error) {
      console.error("Error fetching available models:", error);
    }
  };
  useEffect(() => {
    listModels(); // Logs available models on component load
  }, []);
  

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Search Movie in TMDB
  const searchMovie = async (movie) => {
    const searchResult = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await searchResult.json();
    return json.results;
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);

      // Generate response from Gemini AI with the model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const query = `Give me a list of movies in the format "Movie 1, Movie 2 ...." based on the following criteria: ${inputValue}.\n\nThe list should only contain the names of the movies, separated by commas, without any additional text or information.`;

      const result = await model.generateContent(query);
      const response = await result.response;
      const text = response.text();

      // Split the result into an array of movie names
      const gptMovies = text.split(",").map((movie) => movie.trim());

      // Fetch movie details from TMDB
      const promiseArray = gptMovies.map((movie) => searchMovie(movie));
      const tmdbResults = await Promise.all(promiseArray);

      // Dispatch the results to your store
      dispatch(addGptMovieResults({ movieNames: gptMovies, movieList: tmdbResults }));

      setInputValue(""); // Clear input after search
      setLoading(false);
    } catch (error) {
      console.error("Error in Gemini API:", error);
      setLoading(false);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="p-4 m-4 col-span-9 rounded"
          type="text"
          placeholder="What would you like to watch today?"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="text-white col-span-3 m-4 py-2 px-2 rounded-lg ml-0 bg-red-700"
          onClick={getResponseForGivenPrompt}
        >
          Search
        </button>
        {loading ? (
          <p className="text-center pb-3 text-white col-span-12">Loading...</p>
        ) : (
          <p className="text-center text-white col-span-12"></p>
        )}
      </form>
    </div>
  );
};

export default GPTSearchBar;





// import React, { useRef } from 'react'
// import lang from '../Utils/languageConstants';
// import { useDispatch, useSelector } from 'react-redux'
// // import client from '../utils/geminiAI' 
// import { API_OPTIONS , GEMINI_KEY } from '../Utils/constant'

// import { addGptMovies } from '../../../../Netflix-GPT/src/Components/gptSlice';
// // const { GoogleGenerativeAI } = require("@google/generative-ai");
// import { GoogleGenerativeAI } from "@google/generative-ai";




// const GptSearchBar = () => {

//   const langKey = useSelector(state => state.config?.lang) || "en";
//     const gptSearchText = useRef(null)
//     const dispatch = useDispatch()


//     const searchMovie = async (movie) => {
//         const searchResult = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS)
//         const json = await searchResult.json()
//         return json.results 
//     }

    

//     const handleGptSearchClick = async () => {
//         try {
//             const genAI = new GoogleGenerativeAI(GEMINI_KEY);
//             const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
//             const gptQuery = "Explicitly give the array only . Act as the movie Recommendation system and suggest some good movies based upon this query: "
//              + gptSearchText.current.value 
//              + ".Only the top five movies in array form like [Vivah, Don, Gadar, Haunted, 1920 Evil Returns].";
    
//             const result = await model.generateContent(gptQuery);
//             const movieString = await result.response.text();  // Await the text
    
//             // Log movieString for debugging
//             // console.log("movieString:", movieString);
    
//             // Parse movieString to array and handle errors
//             const movieArray = JSON.parse(movieString);
    
//             if (!Array.isArray(movieArray)) {
//                 console.error("Invalid movie array received:", movieArray);
//                 return;
//             }
    
//             // Map movie names to TMDB search results
//             const data = movieArray.map(movie => searchMovie(movie));
//             const tmdbResults = await Promise.all(data);
    
//             // Dispatch the result to Redux
//             dispatch(addGptMovies({ movieNames: movieArray, movieResults: tmdbResults }));
    
//             // console.log("TMDB Results:", tmdbResults);
//         } catch (error) {
//             console.error("Error fetching GPT results or parsing response:", error);
//         }
//     };
    
    

    
//     return (
//         <div className='pt-[55%] md:pt-[10%] flex justify-center'>
//             <form action="" className=' bg-black w-full  md:w-1/2 grid grid-cols-12 ' onSubmit={ (e) => {e.preventDefault()}}>
//                 <input 
//                     ref = {gptSearchText}
//                     type="text" 
//                     className='py-2 px-1 m-2 md:m-3 rounded-md border  col-span-9 border-black' 
//                     placeholder={lang[langKey]?.gptSearchPlaceholder || "Search for movies"}

//                 />
//                 <button className='p-1 md:p-2 px-1  md:px-5 m-3  bg-red-600 col-span-3 hover:bg-red-700  text-white rounded-lg' 
//                         onClick={handleGptSearchClick}
//                  >{lang[langKey]?.search || "Search"}
// </button>

//             </form>
//         </div>
//     )
// }

// export default GptSearchBar



















// import openai from "../Utils/openai";
// import { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import lang from "../Utils/languageConstants";
// import { API_OPTIONS } from "../Utils/constant";
// import { addGptMovieResults } from "../Utils/gptSlice";

// const GptSearchBar = () => {
//   const dispatch = useDispatch();
//   const langKey = useSelector((store) => store.config.lang);
//   console.log(langKey)
//   const searchText = useRef(null);

//   // search movie in TMDB
//   const searchMovieTMDB = async (movie) => {
//     const data = await fetch(
//       "https://api.themoviedb.org/3/search/movie?query=" +
//         movie +
//         "&include_adult=false&language=en-US&page=1",
//       API_OPTIONS
//     );
//     const json = await data.json();

//     return json.results;
//   };

//   const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// const handleGptSearchClick = async () => {
//   console.log(searchText.current.value);

//   const gptQuery =
//     "Act as a Movie Recommendation system and suggest some movies for the query : " +
//     searchText.current.value +
//     ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

//   let retries = 0;
//   const maxRetries = 5;
//   let gptResults = null;

//   while (retries < maxRetries) {
//     try {
//       gptResults = await openai.chat.completions.create({
//         messages: [{ role: "user", content: gptQuery }],
//         model: "gpt-3.5-turbo",
//       });
//       if (gptResults.choices && gptResults.choices.length > 0) {
//         break; // If request is successful, break the loop
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 429) {
//         // If rate limit is hit, retry after a delay
//         console.log(`Rate limit hit, retrying in ${Math.pow(2, retries)} seconds...`);
//         await delay(Math.pow(2, retries) * 1000); // Exponential backoff
//         retries++;
//       } else {
//         console.error('An error occurred:', error);
//         break; // Exit if any other error occurs
//       }
//     }
//   }

//   if (!gptResults || !gptResults.choices) {
//     console.error('Failed to get GPT results after retries');
//     return;
//   }

//   console.log(gptResults.choices?.[0]?.message?.content);

//   const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
//   const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
//   const tmdbResults = await Promise.all(promiseArray);

//   console.log(tmdbResults);

//   dispatch(
//     addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
//   );
// };

//   return (
//     <div className="pt-[35%] md:pt-[10%] flex justify-center">
//       <form
//         className="w-full md:w-1/2 bg-black grid grid-cols-12"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <input
//           ref={searchText}
//           type="text"
//           className=" p-4 m-4 col-span-9"
//           placeholder={lang[langKey].gptSearchPlaceholder}
//         />
//         <button
//           className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
//           onClick={handleGptSearchClick}
//         >
//           {lang[langKey].search}
//         </button>
//       </form>
//     </div>
//   );
// };
// export default GptSearchBar;