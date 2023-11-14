

/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

 

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/

//need to grab the data from the json files and display them

//displays the data from the json files
function temp(){
   const artistsJson = JSON.parse(artists);
   const genresJson = JSON.parse(genres);

  artistsJson.sort((a, b) => b.name.localeCompare(a.name));


  const artistSelect = document.getElementById("artistSelect");
  for (let value of artistsJson) {
    const option = document.createElement("option");
    option.value = value.id;
    option.textContent = `ID: ${value.id}, Name: ${value.name}, Type: ${value.type}`;
    artistSelect.appendChild(option);
  }

  const genreSelect = document.getElementById("genreSelect");
  for (let value of genresJson) {
    const option = document.createElement("option");
    option.value = value.id;
    option.textContent = `Genres ID: ${value.id}, Genre Name: ${value.name}`;
    genreSelect.appendChild(option);
  }
}

function displaySongs(){
   const sampleSongsJson = JSON.parse(sampleSongs);
   for(let value of sampleSongsJson){
      document.write("Song ID: " + value.song_id + " Title: " + value.title + " Year: " + value.year + " Artist: " + value.artist.name + " Genre: "
       + value.genre.name + " Popularity: " + value.details.popularity + "</br>");
   } 
}

displaySongs();

//displayAll();



