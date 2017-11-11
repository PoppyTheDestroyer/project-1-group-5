jQuery.ajaxPrefilter(function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

//initialize variables
var latitude = 0;

var longitude = 0;

//array of ZIP objects

//this function finds the object with the lat/long info corresponding to the ZIP code
function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      console.log(array[i]);
      return array[i];
    }
  }
  return null;
}

//set variable to equal the ZIP object
var obj = findObjectByKey(zips, "ZIP", 77006);

console.log(obj);
longitude = obj["LNG"];
latitude = obj["LAT"];
console.log(longitude);
console.log(latitude);
 

//gets brewery
var queryURLrandom = "http://api.brewerydb.com/v2/brewery/random?key=35eff59e52d0da84d5ba657eab46cc81";

var queryUrlBrewery = "";

var queryUrlBreweryLoc = "";
//gets breweries in radius
var queryURLradius = "http://api.brewerydb.com/v2/search/geo/point?lat="+latitude+"&lng="+longitude+"&key=35eff59e52d0da84d5ba657eab46cc81";

var queryURLbeers = "";

    $(document).ready(function() {
  // AJAX get beers
//gets beers at brewery
var breweryId = "";


    //getting the brewery info
    $.ajax({
      url: queryURLrandom,
      method: "GET"
    }).done(function(response) {
      var randomResult = response.data;
      console.log(randomResult);



     breweryId = randomResult.id;

    queryUrlBreweryLoc = "http://api.brewerydb.com/v2/brewery/"+breweryId+"/locations?key=35eff59e52d0da84d5ba657eab46cc81";

    queryUrlBrewery = "http://api.brewerydb.com/v2/brewery/"+breweryId+"?key=35eff59e52d0da84d5ba657eab46cc81";


     $.ajax({
      url: queryUrlBrewery,
      method: "GET"
    }).done(function(response) {
      var breweryResult = response.data;

      console.log(breweryResult);
      $("#brewery-name").text(randomResult.name);
      $("#beers-by-brewery").text("Beers Made By "+randomResult.name);
      $("#brewery-img").html("<img src='"+breweryResult.images.squareMedium+"'>");
      $("#brewery-desc").html("<p>"+breweryResult.description+"<br>Website: "+breweryResult.website+"</p>");



  console.log(breweryId);

  queryURLbeers = "http://api.brewerydb.com/v2/brewery/"+breweryId+"/beers?key=35eff59e52d0da84d5ba657eab46cc81";
  $.ajax({
    url: queryURLbeers,
    method: "GET"
  })
    // After the data comes back from the API
    .done(function(response) {
      // Storing an array of results in the results variable
      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i+=1){
        if (results[i].labels != undefined){
          $("#beer-list").append("<div class = 'col-4'><img id = 'beer-"+i+"' src = '"+results[i].labels.medium+"'><br><p>"+results[i].name+"</p></div>");
        }
        $("#beer-list").append("<div class = 'col-4'><img id = 'beer-"+i+"' src = 'http://via.placeholder.com/100+'><br><p>"+results[i].name+"</p></div>");
      }
    });



    });

 });

  });