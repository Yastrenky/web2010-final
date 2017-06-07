const api_endpoint = 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch='
const wiki_link = 'https://en.wikipedia.org/wiki'
const searchBox = document.getElementById('searchBox')
const searchButton = document.getElementById('searchButton')
const articlesContainer = document.getElementById('articlesContainer')
searchButton.addEventListener('click', function() {
  console.log("clik");
  searchAcc(searchBox.value)
})
searchBox.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    console.log("enter");
    searchAcc(searchBox.value)
  }
})

function searchAcc(search) {

  $.ajax({
    url: api_endpoint + search,
    dataType: "jsonp",
    method: 'get',
    success: (function(response) {
      if (response.batchcomplete === "") {
        articlesContainer.innerHTML = ""
        for (let i = 0; i < response.query.search.length; i++) {
          var div = document.createElement("div")
          div.innerHTML = articles(response.query.search[i].title, response.query.search[i].snippet)
          articlesContainer.appendChild(div)
        }
      } else {
        alert("Write something to search");
      }
    })
  })
  searchBox.value = searchBox.value
}

function articles() {
  var art = '';
  art += '<a target="_blank" rel="noopener" class="article" href=' + wiki_link + "/" + arguments[0] + '>';
  art += '<h3>' + arguments[0] + '</h3>';
  art += '<p>' + arguments[1] + "...." + '</p>';
  art += '</a>';
  return art;
}
