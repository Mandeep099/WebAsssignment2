

/* url of song api --- https versions hopefully a little later this semester */	
const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

 

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/

//need to grab the data from the json files and display them

//displays the data from the json files
document.addEventListener("DOMContentLoaded", async function(){

   //let sampleSongsJson = JSON.parse(sampleSongs);

   //api local storage
   let songStorage = JSON.parse(localStorage.getItem('songs')) || [];
   songStorage = await getSongData(songStorage);
   view(songStorage);

   //sort buttons
   document.querySelector("#sortTitle").addEventListener("click", function(){
      songStorage = sortItems(songStorage, 'title');
      displaySongs(songStorage, "#songBody tbody");
   });

   document.querySelector("#sortArtist").addEventListener("click", function(){
      sampleSongsJson = sortItems(songStorage, 'artist', 'name');
      displaySongs(songStorage, "#songBody tbody");
   });

   document.querySelector("#sortYear").addEventListener("click", function(){
      sampleSongsJson = sortItems(songStorage, 'year');
      displaySongs(songStorage, "#songBody tbody");
   });

   document.querySelector("#sortGenre").addEventListener("click", function(){
      sampleSongsJson = sortItems(songStorage, 'genre', 'name');
      displaySongs(songStorage, "#songBody tbody");
   });

   document.querySelector("#sortPopularity").addEventListener("click", function(){
      sampleSongsJson = sortItems(songStorage, 'details', 'popularity');
      displaySongs(songStorage, "#songBody tbody");
   });

   //checking if local storage is empty or not
   async function getSongData(songStorage){
      if(songStorage.length == 0){
         songStorage = await getSongAPI();
         localStorage.setItem('songs', JSON.stringify(songStorage));
      }
      return songStorage;
   }

   //fetching data from api
   async function getSongAPI(){
      const response = await fetch(api);
      const data = await response.json();
      return data;
   }

   function view(songStorage){
      displaySongs(songStorage, "#songBody tbody");
      songDropdown();
   }
    //function to dispaly the sample songs currently
   function displaySongs(collection, selector){
      document.querySelector(selector).innerHTML = "";
      const table = document.querySelector(selector);
      for(let value of collection){
         const tr = document.createElement("tr");
         const title = document.createElement("td");
         const artist = document.createElement("td");
         const year = document.createElement("td");
         const genre = document.createElement("td");
         const popularity = document.createElement("td");

         title.textContent = value.title;
         artist.textContent = value.artist.name;
         year.textContent = value.year;
         genre.textContent = value.genre.name;
         popularity.textContent = value.details.popularity;

         tr.appendChild(title);
         tr.appendChild(artist);
         tr.appendChild(year);
         tr.appendChild(genre);
         tr.appendChild(popularity);

         table.appendChild(tr);

      } 
   }
   //
   function songDropdown(){
      let artistsJson = JSON.parse(artists);
      let genresJson = JSON.parse(genres);

      const artistSelect = document.querySelector("#artistSelect");
      for (let value of artistsJson) {
        const option = document.createElement("option");
        option.value = value.id;
        option.textContent = value.name;
        artistSelect.appendChild(option);
      }

      const genreSelect = document.querySelector("#genreSelect");
      for (let value of genresJson) {
        const option = document.createElement("option");
        option.value = value.id;
        option.textContent = value.name;
        genreSelect.appendChild(option);
      }
   }
   //sort method
   //used this to help get an idea for the sort method
   //https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
   function sortItems(song, value, value2){
      song.sort((a,b) =>{
         if(value2){
            if(a[value][value2].toString().toLowerCase() < b[value][value2].toString().toLowerCase()){
               return -1;
            }
            else if(a[value][value2].toString().toLowerCase() > b[value][value2].toString().toLowerCase()){
               return 1;
            }
            else{
               return 0;
            }
            //return a[value][value2].toString().toLowerCase() < b[value][value2].toString().toLowerCase() ? -1 : 1;
         }
         else{
            if(a[value].toString().toLowerCase() < b[value].toString().toLowerCase()){
               return -1;
            }
            else if(a[value].toString().toLowerCase() > b[value].toString().toLowerCase()){
               return 1;
            }
            else{
               return 0;
            }
            //return a[value].toString().toLowerCase() < b[value].toString().toLowerCase() ? -1 : 1;
         }
      });
      return song;
   }

});