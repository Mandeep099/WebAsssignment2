

/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

 

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/

//need to grab the data from the json files and display them

//displays the data from the json files
document.addEventListener("DOMContentLoaded", function(){
   let artistsJson = JSON.parse(artists);
   let genresJson = JSON.parse(genres);
   let sampleSongsJson = JSON.parse(sampleSongs);

   //artistsJson.sort((a, b) => b.name.localeCompare(a.name));

   document.querySelector("#sortTitle").addEventListener("click", function(){
      sampleSongsJson = sortItems(sampleSongsJson, 'title');
      displaySongs(sampleSongsJson, "#sampleSongSelect");
   });

   document.querySelector("#sortArtist").addEventListener("click", function(){
      sampleSongsJson = sortItems(sampleSongsJson, 'artist', 'name');
      displaySongs(sampleSongsJson, "#sampleSongSelect");
   });

   document.querySelector("#sortYear").addEventListener("click", function(){
      sampleSongsJson = sortItems(sampleSongsJson, 'year');
      displaySongs(sampleSongsJson, "#sampleSongSelect");
   });

   document.querySelector("#sortGenre").addEventListener("click", function(){
      sampleSongsJson = sortItems(sampleSongsJson, 'genre', 'name');
      displaySongs(sampleSongsJson, "#sampleSongSelect");
   });

   document.querySelector("#sortPopularity").addEventListener("click", function(){
      sampleSongsJson = sortItems(sampleSongsJson, 'details', 'popularity');
      displaySongs(sampleSongsJson, "#sampleSongSelect");
   });

   //function to display the artists
   function artist(){
      const artistSelect = document.querySelector("#artistSelect");
      for (let value of artistsJson) {
        const option = document.createElement("option");
        option.value = value.id;
        option.textContent = `ID: ${value.id}, Name: ${value.name}, Type: ${value.type}`;
        artistSelect.appendChild(option);
      }
   }

   //function to dispaly the genres
   function genre(){
      const genreSelect = document.querySelector("#genreSelect");
      for (let value of genresJson) {
        const option = document.createElement("option");
        option.value = value.id;
        option.textContent = `Genres ID: ${value.id}, Genre Name: ${value.name}`;
        genreSelect.appendChild(option);
      }
    }

    //function to dispaly the sample songs currently
   function displaySongs(songs, selector){
      document.querySelector(selector).innerHTML = "";
      const song = document.querySelector(selector);
      for(let value of songs){
         const option = document.createElement("p");
         option.setAttribute("value", value.song_id);
         option.textContent = `Song Name: ${value.title}, Artist Name: ${value.artist.name}, Genre: ${value.genre.name} Year: ${value.year} Popularity: ${value.details.popularity}`;
         song.appendChild(option);
      } 
   }
   //used this to help get an idea for the sort method
   //https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
   function sortItems(song, value, value2){
      song.sort((a,b) =>{
         if(value2){
            if(a[value][value2].toString().toLowerCase() < b[value][value2].toString().toLowerCase()){
               return -1
            }
            else if(a[value][value2].toString().toLowerCase() > b[value][value2].toString().toLowerCase()){
               return 1
            }
            else{
               return 0;
            }
            //return a[value][value2].toString().toLowerCase() < b[value][value2].toString().toLowerCase() ? -1 : 1;
         }
         else{
            if(a[value].toString().toLowerCase() < b[value].toString().toLowerCase()){
               return -1
            }
            else if(a[value].toString().toLowerCase() > b[value].toString().toLowerCase()){
               return 1
            }
            else{
               return 0;
            }
            //return a[value].toString().toLowerCase() < b[value].toString().toLowerCase() ? -1 : 1;
         }
      });
      return song;
   }

   artist();
   genre();
   displaySongs(sampleSongsJson, "#sampleSongSelect");

});

/*
         document.write("Song ID: " + value.song_id + " Title: " + value.title + " Year: " + value.year + " Artist: " + value.artist.name + " Genre: "
       + value.genre.name + " Popularity: " + value.details.popularity + "</br>");
*/

