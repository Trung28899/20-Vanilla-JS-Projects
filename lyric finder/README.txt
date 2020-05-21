NOTABLE THINGS ABOUT THIS PROJECT: 

1. JS code flow and operations: 

Listen for submit event in the form 
> check if the search term is empty or not 

> searchSongs function to fetch data from api, 
format that data for usage

> showData function to loop through all the results
of the data, create html tags and display the results

> showData also check if there is previous page or
next page of result. Embed function to get the previous
page or next page of songs 

> getMoreSongs function to fetch data of next or
previous page data and call showData function to 
show the data 

> Get lyrics button listener to get the data needed
to fetch lyrics from api, then call getLyrics

> getLyrics function to fetch data for lyrics,  
format the lyrics and create new html tags for 
displaying the lyrics

2. Interesting Trick should learn from This project:
 
- Event listener check for valid input then 
proceed to next operation by calling a new function

- Fetching API using async and await in following
functions: searchSongs(), getMoreSongs() and 
getLyrics()

- Looping and adding html content with custom
attribute to pass data for later usage like the
li tag in showData() with attribute data-artist
and data-songtitle

- The use of functions: reusable like showData() 
or using function in the end of a function to pass
in data conveniently and make clearer code flow