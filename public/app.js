var app = function(){

  var url = 'https://api.spotify.com/v1/search?q=christmas&type=album';
  makeRequest(url, requestComplete);

}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function(){
  console.log("success");
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var spotify = JSON.parse(jsonString);
  var albums = spotify.albums.items;
  console.log(albums);
  // once this information has been passed down call populate
  populateList(albums);
}

var populateList = function(albums){

  var ul = document.getElementById('albums');

    albums.forEach(function(album){

    var li = document.createElement('li');
    li.innerText = "Artist: " + album.artists[0].name + "\nAlbum: " + album.name;
    ul.appendChild(li);

    var albumImage = document.createElement('img');
    albumImage.src = album.images[1].url;
    ul.appendChild(albumImage);

    var albumLink = document.createElement('a');
    albumLink.innerText = "\nListen on spotify";
    albumLink.href = album.external_urls.spotify;
    ul.appendChild(albumLink);

    })

}

window.onload = app;
