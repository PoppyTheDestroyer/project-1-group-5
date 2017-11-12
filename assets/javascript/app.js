jQuery.ajaxPrefilter(function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

//initialize variables
var latitude = 0;

var longitude = 0;


//gets brewery
var queryURLrandom = "http://api.brewerydb.com/v2/brewery/random?key=35eff59e52d0da84d5ba657eab46cc81";

var queryUrlBrewery = "";

var queryUrlBreweryLoc = "";
//gets breweries in radius
var queryURLradius = "http://api.brewerydb.com/v2/search/geo/point?lat=" + latitude + "&lng=" + longitude + "&key=35eff59e52d0da84d5ba657eab46cc81";

var queryURLbeers = "";

$(document).ready(function () {
  // AJAX get beers
  //gets beers at brewery
  var breweryId = "";


  //getting the brewery info
  $.ajax({
    url: queryURLrandom,
    method: "GET"
  }).done(function (response) {
    var randomResult = response.data;
    console.log(randomResult);



    breweryId = randomResult.id;

    queryUrlBreweryLoc = "http://api.brewerydb.com/v2/brewery/" + breweryId + "/locations?key=35eff59e52d0da84d5ba657eab46cc81";

    queryUrlBrewery = "http://api.brewerydb.com/v2/brewery/" + breweryId + "?key=35eff59e52d0da84d5ba657eab46cc81";


    $.ajax({
      url: queryUrlBrewery,
      method: "GET"
    }).done(function (response) {
      var breweryResult = response.data;

      console.log(breweryResult);
      $("#brewery-name").text(randomResult.name);
      $("#beers-by-brewery").text("Beers Made By " + randomResult.name);
      $("#brewery-img").html("<img src='" + breweryResult.images.squareMedium + "'>");
      $("#brewery-desc").html("<p>" + breweryResult.description + "<br>Website: " + breweryResult.website + "</p>");

      $.ajax({
        url: queryUrlBreweryLoc,
        method: "GET"
      }).done(function (response) {
        var breweryLocResult = response.data;
        brewLat = breweryLocResult.lat;
        brewLng = breweryLocResult.lng;

      });
      console.log(breweryId);

      queryURLbeers = "http://api.brewerydb.com/v2/brewery/" + breweryId + "/beers?key=35eff59e52d0da84d5ba657eab46cc81";
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



    });

  });

});
var map, infoWindow;
var request = {
  location: map.getCenter(),
  radius: "500",
  query: breweryName
};
//Begin function by defining the map with initial coordinates.
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: brewLat, lng: brewLng },
    zoom: 12
  });
  console.log("farts");
  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
  //Initialize info window
  infoWindow = new google.maps.InfoWindow;

  //geolocation.
  /* if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function (position) {
           var pos = {
               lat: position.coords.latitude,
               lng: position.coords.longitude
           };
           
           infoWindow.setPosition(pos);
           infoWindow.setContent("Location found");
           infoWindow.open(map);
         
           map.setCenter(pos);
          
           console.log("poop")
           
           console.log("poopfarts")

       }, function () {
           handleLocationError(true, infoWindow, map.getCenter());
       });
   } else {
       // Browser doesn't support Geolocation
       handleLocationError(false, infoWindow, map.getCenter());
   };
*/
}

function callback(results, status) {
  service = new google.maps.places.PlacesService(map);
  var details = google.maps.places.PlaceResult;
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    var marker = new google.maps.Marker({
      map: map,
      place: {
        placeId: results[0].place_id,
        location: results[0].geometry.location
      }
    })
    console.log(marker);
    var infoWindow = new google.maps.InfoWindow({
      place: {
        placeId: results[0].place_id,
        name: results[0].name,
        address: results[0].formatted_address
      }
    })
    console.log(infoWindow);
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.setContent('<div><strong>' + infoWindow.place.name + '</strong><br>' +
        infoWindow.place.address + '</div>');
      infoWindow.open(map, this)
    });
    console.log("butts");
  }
}

//Search
google.maps.event.addDomListener(window, "load", initMap);
console.log("nacho cheeeeeeeeese")
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

var map, infoWindow;
var request = {
  location: map.getCenter(),
  radius: "500",
  query: brewery
};
//Begin function by defining the map with initial coordinates.
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: brewLat, lng: brewLng },
    zoom: 12
  });
  console.log("farts");
  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
  //Initialize info window
  infoWindow = new google.maps.InfoWindow;

  //geolocation.
  /* if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function (position) {
           var pos = {
               lat: position.coords.latitude,
               lng: position.coords.longitude
           };
           
           infoWindow.setPosition(pos);
           infoWindow.setContent("Location found");
           infoWindow.open(map);
         
           map.setCenter(pos);
          
           console.log("poop")
           
           console.log("poopfarts")

       }, function () {
           handleLocationError(true, infoWindow, map.getCenter());
       });
   } else {
       // Browser doesn't support Geolocation
       handleLocationError(false, infoWindow, map.getCenter());
   };
*/
}

function callback(results, status) {
  service = new google.maps.places.PlacesService(map);
  var details = google.maps.places.PlaceResult;
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    var marker = new google.maps.Marker({
      map: map,
      place: {
        placeId: results[0].place_id,
        location: results[0].geometry.location
      }
    })
    console.log(marker);
    var infoWindow = new google.maps.InfoWindow({
      place: {
        placeId: results[0].place_id,
        name: results[0].name,
        address: results[0].formatted_address
      }
    })
    console.log(infoWindow);
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.setContent('<div><strong>' + infoWindow.place.name + '</strong><br>' +
        infoWindow.place.address + '</div>');
      infoWindow.open(map, this)
    });
    console.log("butts");
  }
}

//Search
google.maps.event.addDomListener(window, "load", initMap);
console.log("nacho cheeeeeeeeese")
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}


// Here we use jQuery to select the header with "click-me" as its ID.
// Whenever it is clicked...



