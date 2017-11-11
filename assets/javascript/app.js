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
var queryURLbrewery = "http://api.brewerydb.com/v2/brewery/tfZkDt?key=35eff59e52d0da84d5ba657eab46cc81";
//gets breweries in radius
var queryURLradius = "http://api.brewerydb.com/v2/search/geo/point?lat=" + latitude + "&lng=" + longitude + "&key=35eff59e52d0da84d5ba657eab46cc81";
//gets beers at brewery
var queryURLbeers = "http://api.brewerydb.com/v2/brewery/tfZkDt/beers?key=35eff59e52d0da84d5ba657eab46cc81";

$(document).ready(function () {
  // AJAX get beers
  $.ajax({
    url: queryURLbeers,
    method: "GET"
  })
    // After the data comes back from the API
    .done(function (response) {
      // Storing an array of results in the results variable
      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i += 1) {
        if (results[i].labels != undefined) {
          $("#beer-list").append("<div class = 'col-4'><img id = 'beer-" + i + "' src = '" + results[i].labels.medium + "'><br><p>" + results[i].name + "</p></div>");
        }
        $("#beer-list").append("<div class = 'col-4'><img id = 'beer-" + i + "' src = 'http://via.placeholder.com/100+'><br><p>" + results[i].name + "</p></div>");
      }
    });

  //getting the brewery info
  $.ajax({
    url: queryURLbrewery,
    method: "GET"
  }).done(function (response) {
    var breweryresult = response.data;
    console.log(breweryresult);
    $("#brewery-name").text(breweryresult.name);
    $("#beers-by-brewery").text("Beers Made By " + breweryresult.name);
    $("#brewery-img").html("<img src='" + breweryresult.images.squareMedium + "'>");
    $("#brewery-desc").html("<p>" + breweryresult.description + "<br>Website: " + breweryresult.website + "</p>");
  });


  // AJAX get beers
  $.ajax({
    url: queryURLradius,
    method: "GET"
  }).done(function (response) {
    // Storing an array of results in the results variable
    var breweryradius = response.data;
    console.log(breweryradius);
    for (var i = 0; i < 10; i += 1) {
      if (breweryradius != undefined) {
        $("#brewery-list").append("<li id = 'brewery-" + i + "'>" + breweryradius[i].brewery.name + "</li>");

        $("#brewery" + i + "").on("click", function () {

          // ... we trigger an alert.
          alert("I've been clicked!" + this.id + "");
        });
      }
    }
  });
  



  // Here we use jQuery to select the header with "click-me" as its ID.
  // Whenever it is clicked...


});
