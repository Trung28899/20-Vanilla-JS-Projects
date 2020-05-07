const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// Searh by song or artist
async function searchSongs(term) {
  // Fetching data by non async/await way:
  /*
    fetch(`${apiURL}/suggest/${term}`)
    .then((result) => result.json())
    .then((data) => console.log(data));
    */

  // Fetching data by await way:
  const result = await fetch(`${apiURL}/suggest/${term}`);
  const data = await result.json();
  // See the data JSON for reference
  console.log(data);

  showData(data);
}

// Show songs and artist in DOM
function showData(data) {
  let output = "";

  data.data.forEach((song) => {
    output += `
            <li>
                <span><strong>${song.artist.name}</strong>- ${song.title}</span>
                <button class="btn" data-artist="${song.artist.name}"
                data-songtitle="${song.title}">Get Lyrics</button>
            </li>
        `;
  });

  result.innerHTML = `
    <ul class="songs">
        ${output}
    </ul>
  `;

  if (data.prev || data.next) {
    // See the data in the console > will see the prev and next field in JSON
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ``
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ``
      }
    `;
    console.log("next data: " + data.next);
  } else {
    more.innerHTML = "";
    s;
  }
}

// Get prev / next result
async function getMoreSongs(url) {
  // Add heroku cor anywhere proxy before the url
  const result = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await result.json();

  // See the data JSON for reference
  // console.log("Prev / Next Page is: ");
  // console.log(data);

  showData(data);
}

// Get lyrics for song
async function getLyrics(artist, songtitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songtitle}`);
  const data = await res.json();

  if (data.error) {
    result.innerHTML = data.error;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `
        <h2><strong>${artist}</strong> - ${songtitle}</h2>
        <span>${lyrics}</span>
    `;
  }

more.innerHTML = '';
}

// Form event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please Enter Artist Or Song Name");
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener("click", (e) => {
  // getting the button element that is clicked
  const clickEl = e.target;
  // console.log(clickEl);

  if (clickEl.tagName === "BUTTON") {
    const artist = clickEl.getAttribute("data-artist");
    const songtitle = clickEl.getAttribute("data-songtitle");

    getLyrics(artist, songtitle);
  }
});
