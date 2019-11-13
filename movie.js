$(document).ready(function()
{
    $("#search").on("submit",function(e)
    {
        let serachtext = $("#movietext").val();
        if(serachtext ==0)
        {
          alert("It should not be empty!!")
        }
        else if(!isNaN(serachtext))
        {
          alert("Enter valid information");
          document.getElementById("movietext").value=" ";
        }
        getMovies(serachtext); 
        event.preventDefault();
    }); 


    function getMovies(serachtext){
        axios.get("http://www.omdbapi.com/?s=&apikey=d76e8e17&s="+serachtext)
   .then(function (response) {
    
      let movies = response.data.Search;
      let output = " ";

        $.each(movies,(index,movie) => {
          output +=`
          <section class="section">
          <div class="mv">
          <a href="moviedetails.html" onClick="selectMovie('${movie.imdbID}')">
          <img src="${movie.Poster}"/></a>
          <h5>${movie.Title}</h5>
          </div>
          </section>
          `;
          $("#moviesearch").html(output);

        });

    console.log(response);
  })
  .catch(function (error) {
    
    console.log(error);
  });
    
    };
});

function selectMovie(id){
  sessionStorage.setItem("movieId",id);
  window.location="moviedetails.html";
  return false;
}

function getMovieDetails()
{
  let id=sessionStorage.getItem("movieId");
  axios.get("http://www.omdbapi.com/?apikey=d76e8e17&i="+id)
  .then(function (response) {

    let details = response.data;
    let output = " ";

    output =`
      <div class="details">
      <div class="img"><center><img class="details" src="${details.Poster}"/>
      <h2>${details.Title}</h2></center>
      </div>
      <ul>
      <li><strong>Genre :</strong>${details.Genre}</li>
      <li><strong>Released :</strong>${details.Release}</li>
      <li><strong>Cast :</strong>${details.Actors}</li>
      <li><strong>Writer :</strong>${details.Writer}</li>
      <li><strong>IMDB votes :</strong>${details.imdbVotes}</li>
      <li><strong>IMDB Rating :</strong>${details.imdbRating}</li>

      </ul>
      
      
      </div>
    `;
    $("#movie").html(output);
    console.log(response);
  })
  .catch(function (error) {
    
    console.log(error);
  });
    
}
