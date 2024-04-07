// // Your code here

// DOM is loaded and event listener added
document.addEventListener("DOMContentLoaded", () => {
  // declaring our variables and assigning them
  const movieTitle = document.getElementById("title");
  const runTime = document.getElementById("runtime");
  const movieInfo = document.getElementById("film-info");
  const ticketNum = document.getElementById("ticket-num");
  const showTime = document.getElementById("showtime");
  const button = document.getElementById("buy-ticket");
  const movieList = document.getElementById("films");
  const poster = document.querySelector("img#poster");

  //   invocking our functions
  getMovies();
  listMovies();
  //fetching films from the remote server
  function getMovies() {
    fetch("http://localhost:3000/films")
      .then((res) => res.json())
      .then((movie) => {
        const firstMovie = document.querySelector("#id1");
      });
  }
  //Function for displaying movie/poster details
  function movieDetails(movie) {
    movieTitle.textContent = movie.title;
    runTime.textContent = `${movie.runtime} minutes`;
    showTime.textContent = movie.showTime;
    movieInfo.textContent = movie.description;
    poster.src = movie.poster;
    let remainingTickets = movie.capacity - movie.tickets_sold;
    ticketNum.innerText = remainingTickets;
    ticketNumber(remainingTickets);
  }
  //listing our movies and iterating over them using for each
  function listMovies() {
    fetch("http://localhost:3000/films")
      .then((res) => res.json())
      .then((movie) => {
        movie.forEach((movie) => {
          let movieItem = document.createElement("li");
          movieItem.textContent = movie.title.toUpperCase();
          movieList.append(movieItem);
          movieItem.addEventListener("click", (e) => {
            e.preventDefault();
            movieDetails(movie);
          });
        });
      });
  }
  //Handling ticketnumbers
  function ticketNumber(remainingTickets) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (remainingTickets > 0) {
        remainingTickets -= 1;
        ticketNum.textContent = remainingTickets;
      } else if (remainingTickets <= 0) {
        button.textContent = "Sold Out";
      }
    });
  }
});
