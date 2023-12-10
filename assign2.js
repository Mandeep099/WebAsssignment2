/* url of song api --- https versions hopefully a little later this semester */
const api =
  "https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php";

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/

//need to grab the data from the json files and display them

//displays the data from the json files
document.addEventListener("DOMContentLoaded", async function () {
  let songStorage = JSON.parse(localStorage.getItem("songs")) || [];
  let playlist = [];
  songStorage = await getSongData(songStorage);
  songStorage = sortItems(songStorage, "title");
  view(songStorage);

  //sort buttons
  document.querySelector("#sortTitle").addEventListener("click", function () {
    songStorage = sortItems(songStorage, "title");
    displaySongs(songStorage, "tbody");
  });

  document.querySelector("#sortArtist").addEventListener("click", function () {
    sampleSongsJson = sortItems(songStorage, "artist", "name");
    displaySongs(songStorage, "tbody");
  });

  document.querySelector("#sortYear").addEventListener("click", function () {
    sampleSongsJson = sortItems(songStorage, "year");
    displaySongs(songStorage, "tbody");
  });

  document.querySelector("#sortGenre").addEventListener("click", function () {
    sampleSongsJson = sortItems(songStorage, "genre", "name");
    displaySongs(songStorage, "tbody");
  });

  document
    .querySelector("#sortPopularity")
    .addEventListener("click", function () {
      sampleSongsJson = sortItems(songStorage, "details", "popularity");
      displaySongs(songStorage, "tbody");
    });

  //clear button
  document.querySelector("#clear").addEventListener("click", function () {
    songStorage = JSON.parse(localStorage.getItem("songs")) || [];
    getSongData(songStorage);
    displaySongs(songStorage, "tbody");
  });

  //filter events
  //used to help implement the below querry selector
  //https://stackoverflow.com/questions/21166860/check-a-radio-button-with-javascript
  document.querySelector("#filter").addEventListener("click", function () {
    if (document.querySelector("#titleRadio").checked) {
      songStorage = JSON.parse(localStorage.getItem("songs")) || [];
      getSongData(songStorage);
      songStorage = filterTitle(songStorage);
      displaySongs(songStorage, "tbody");
    } else if (document.querySelector("#artistRadio").checked) {
      songStorage = JSON.parse(localStorage.getItem("songs")) || [];
      getSongData(songStorage);
      songStorage = filterArtist(songStorage);
      displaySongs(songStorage, "tbody");
    } else if (document.querySelector("#genreRadio").checked) {
      songStorage = JSON.parse(localStorage.getItem("songs")) || [];
      getSongData(songStorage);
      songStorage = filterGenre(songStorage);
      displaySongs(songStorage, "tbody");
    }
  });

  //add item to playlist
  document.querySelector("tbody").addEventListener("click", function (e) {
    if (e.target && e.target.className.toLowerCase() == "add") {
      let song = songStorage.find((a) => a.song_id == e.target.dataset.id);
      snackbar();
      playlist.push(song);
    }
  });

  //delete item from playlist
  document.querySelector("#table2").addEventListener("click", function (e) {
    if (e.target && e.target.className.toLowerCase() == "remove") {
      let song = songStorage.find((a) => a.song_id == e.target.dataset.id);
      playlist.pop(song);
      playListView(playlist);
    }
  });

  //clear playlist
  document
    .querySelector("#playlistClear")
    .addEventListener("click", function () {
      playlist = [];
      playListView(playlist);
    });

  //display playlist
  document.querySelector("#playlist").addEventListener("click", function () {
    let section = document.querySelector("#songSection");
    let section2 = document.querySelector("#playlistSection");
    let section3 = document.querySelector("#menuSection");
    section.setAttribute("class", "hidden");
    section2.classList.toggle("visible");
    section3.setAttribute("class", "hidden");
    playListView(playlist);
  });

  document
    .querySelector("#playlistClose")
    .addEventListener("click", function () {
      let section = document.querySelector("#songSection");
      let section2 = document.querySelector("#playlistSection");
      let section3 = document.querySelector("#menuSection");
      section.setAttribute("class", "visible");
      section2.classList.toggle("visible");
      section3.setAttribute("class", "visible");
    });

  document.querySelector("#credit").addEventListener("mouseover", function () {
    let hover = document.querySelector("#creditHover");
    hover.setAttribute("class", "visible");
    setTimeout(function () {
      hover.setAttribute("class", "hidden");
    }, 5000);
  });

  //checking if local storage is empty or not
  async function getSongData(songStorage) {
    if (songStorage.length == 0) {
      songStorage = await getSongAPI();
      localStorage.setItem("songs", JSON.stringify(songStorage));
    }
    return songStorage;
  }

  //fetching data from api
  async function getSongAPI() {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  }

  function view(songStorage) {
    displaySongs(songStorage, "tbody");
    songDropdown();
  }

  //function to dispaly the sample songs currently
  function displaySongs(collection, selector) {
    document.querySelector(selector).innerHTML = "";
    const table = document.querySelector(selector);
    for (let value of collection) {
      const tr = document.createElement("tr");
      const title = document.createElement("td");
      const artist = document.createElement("td");
      const year = document.createElement("td");
      const genre = document.createElement("td");
      const popularity = document.createElement("td");
      const addToPlaylist = document.createElement("button");

      //make song title clickable for single song view
      const titleLink = document.createElement("a");
      titleLink.href = "#";
      titleLink.textContent = value.title;

      title.textContent = value.title;
      artist.textContent = value.artist.name;
      year.textContent = value.year;
      genre.textContent = value.genre.name;
      popularity.textContent = value.details.popularity;

      //setting the data set to the button before calling the function
      addToPlaylist.dataset.id = value.song_id;
      buttonChange(addToPlaylist, selector);

      //click event for title link
      titleLink.addEventListener("click", function () {
        displaySingleSongView(value);
      });

      tr.appendChild(titleLink);
      tr.appendChild(artist);
      tr.appendChild(year);
      tr.appendChild(genre);
      tr.appendChild(popularity);
      tr.appendChild(addToPlaylist);

      table.appendChild(tr);
    }
  }

  //single song view function
  function displaySingleSongView(song) {
    const songName = song.title;
    const artistName = song.artist.name;
    const artistType = song.artist.type;
    const genre = song.genre.name;
    const year = song.year;
    const durationInSeconds = song.details.duration;
    const bpm = song.details.bpm;
    const energy = song.analytics.energy;
    const danceability = song.analytics.danceability;
    const liveness = song.analytics.liveness;
    const valence = song.analytics.valence;
    const acousticness = song.analytics.acousticness;
    const speechiness = song.analytics.speechiness;
    const popularity = song.details.popularity;

    //convert duration format to minutes + seconds
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const formattedDuration = `${minutes} minutes ${seconds} seconds`;

    document.querySelector("#title").textContent = "Title: " + songName;
    document.querySelector("#artist").textContent = "Artist: " + artistName;
    document.querySelector("#artistType").textContent =
      "Artist Type: " + artistType;
    document.querySelector("#genre").textContent = "Genre: " + genre;
    document.querySelector("#year").textContent = "Year: " + year;
    document.querySelector("#duration").textContent =
      "Duration: " + formattedDuration;
    document.querySelector("#bpm").textContent = "BPM: " + bpm;
    document.querySelector("#energy").textContent = "Energy: " + energy;
    document.querySelector("#danceability").textContent =
      "Danceability: " + danceability;
    document.querySelector("#liveness").textContent = "Liveness: " + liveness;
    document.querySelector("#valence").textContent = "Valence: " + valence;
    document.querySelector("#acousticness").textContent =
      "Acousticness: " + acousticness;
    document.querySelector("#speechiness").textContent =
      "Speechiness: " + speechiness;
    document.querySelector("#popularity").textContent =
      "Popularity: " + popularity;

    //playlist view
    document.querySelector("#title1").textContent = "Title: " + songName;
    document.querySelector("#artist1").textContent = "Artist: " + artistName;
    document.querySelector("#artistType1").textContent =
      "Artist Type: " + artistType;
    document.querySelector("#genre1").textContent = "Genre: " + genre;
    document.querySelector("#year1").textContent = "Year: " + year;
    document.querySelector("#duration1").textContent =
      "Duration: " + formattedDuration;
    document.querySelector("#bpm1").textContent = "BPM: " + bpm;
    document.querySelector("#energy1").textContent = "Energy: " + energy;
    document.querySelector("#danceability1").textContent =
      "Danceability: " + danceability;
    document.querySelector("#liveness1").textContent = "Liveness: " + liveness;
    document.querySelector("#valence1").textContent = "Valence: " + valence;
    document.querySelector("#acousticness1").textContent =
      "Acousticness: " + acousticness;
    document.querySelector("#speechiness1").textContent =
      "Speechiness: " + speechiness;
    document.querySelector("#popularity1").textContent =
      "Popularity: " + popularity;
  }

  //snackbar funtion
  //taken from
  //https://www.geeksforgeeks.org/how-to-create-a-snackbar-using-hmtl-css-javascript/
  function snackbar() {
    let snack = document.querySelector("#snackbar");
    snack.setAttribute("class", "show");
    snack.textContent = "Song Added To Playlist";
    setTimeout(function () {
      snack.setAttribute("class", " ");
    }, 3000);
  }
  //function to create the add and remove buttons
  function buttonChange(addToPlaylist, selector) {
    if (selector == "tbody") {
      addToPlaylist.setAttribute("class", "add");
      addToPlaylist.textContent = "Add";
    } else {
      addToPlaylist.setAttribute("class", "remove");
      addToPlaylist.textContent = "Remove";
    }
    return addToPlaylist;
  }

  //display playlist
  function playListView(playlist) {
    let playlistMath = document.querySelector("#playlistMath");
    let temp = playlistCalc(playlist);
    playlistMath.textContent = temp;
    displaySongs(playlist, "#tablePlaylist tbody");
  }
  //dropdown menus for genre and artists
  function songDropdown() {
    let artistsJson = JSON.parse(artists);
    let genresJson = JSON.parse(genres);

    const artistSelect = document.querySelector("#artistSelect");
    for (let value of artistsJson) {
      const option = document.createElement("option");
      option.value = value.name;
      option.textContent = value.name;
      artistSelect.appendChild(option);
    }

    const genreSelect = document.querySelector("#genreSelect");
    for (let value of genresJson) {
      const option = document.createElement("option");
      option.value = value.name;
      option.textContent = value.name;
      genreSelect.appendChild(option);
    }
  }

  function playlistCalc(playlist) {
    let count = 0;
    let popularityCount = 0;
    for (let value of playlist) {
      popularityCount += value.details.popularity;
      count++;
    }

    const averagePopularity = popularityCount / count;
    const roundedAverage = Math.round(averagePopularity);

    return (
      "Number of Songs in Playlist: " +
      playlist.length +
      ", Average Popularity of Playlist: " +
      roundedAverage
    );
  }

  //sort method
  //used this to help get an idea for the sort method
  //https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  function sortItems(song, value, value2) {
    song.sort((a, b) => {
      if (value2) {
        if (
          a[value][value2].toString().toLowerCase() <
          b[value][value2].toString().toLowerCase()
        ) {
          return -1;
        } else if (
          a[value][value2].toString().toLowerCase() >
          b[value][value2].toString().toLowerCase()
        ) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (
          a[value].toString().toLowerCase() < b[value].toString().toLowerCase()
        ) {
          return -1;
        } else if (
          a[value].toString().toLowerCase() > b[value].toString().toLowerCase()
        ) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    return song;
  }

  //would like to error test these dont know if its possible
  //filter functions
  //used this to help implement the filter functions
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  function filterTitle(songStorage) {
    let titleName = document.querySelector("#titleName").value;
    return songStorage.filter((a) => a.title.toString().includes(titleName));
  }

  function filterArtist(songStorage) {
    return songStorage.filter((a) =>
      a.artist.name.includes(document.querySelector("#artistSelect").value)
    );
  }

  function filterGenre(songStorage) {
    return songStorage.filter((a) =>
      a.genre.name.includes(document.querySelector("#genreSelect").value)
    );
  }
});
