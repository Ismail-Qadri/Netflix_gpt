export const USER_AVATAR =
  "https://i.pinimg.com/474x/5b/50/e7/5b50e75d07c726d36f397f6359098f58.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDlkNDM4YjYxOGFhODhmMGFhNzcwNTcyOTBjODEwYSIsIm5iZiI6MTcyMDE5NDEwNC4wNDQ1MDEsInN1YiI6IjY2ODgxMzA5N2JhOGNlMzI4ZDFiODViOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.inWEg1691jHDCnBwpU-E8JIs7Hove3wtU5tZeiFa0a0",
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const GEMINI_KEY = import.meta.env.VITE_GEMINI_API

// export const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const SUPPORTED_LANGUAGES = [{identifier : "en" , name  :" English"} ,
  {identifier : "hindi" , name  :" Hindi"}  ,
  {identifier : "spanish" , name  :" Spanish"}
]