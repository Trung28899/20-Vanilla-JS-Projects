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
    more.innerHTML = ``;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please Enter Artist Or Song Name");
  } else {
    searchSongs(searchTerm);
  }
});
