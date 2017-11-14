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

var breweryId = "";

$(document).ready(function () {
  // AJAX get beers
  //gets beers at brewery

//  $.get("index.html").then(function(responseData){
  //  console.log(responseData);
  //});

  //getting the brewery info
  $.ajax({
    url: queryURLrandom,
    method: "GET"
  }).done(function (response) {
      var randomResult = response.data;

      console.log(randomResult);

      breweryId = randomResult.id;
      console.log(breweryId);


    $.ajax({
      url: queryUrlBrewery,
      method: "GET"
    }).done(function (response) {
      var breweryResult = response.data;

      var brewLat = 0;
      var brewLng = 0;

      $.ajax({
        url: queryUrlBrewery,
        method: "GET"
      }).done(function (response) {
        var breweryResult = response.data;

        console.log(breweryResult);
        $("#brewery-name").text(randomResult.name);
        $("#beers-by-brewery").text("Beers Made By " + randomResult.name);
        if (breweryResult.images.squareMedium === undefined){
          $("#brewery-img").html("<img src='http://via.placeholder.com/100+'>");

        }else{
        $("#brewery-img").html("<img src='" + breweryResult.images.squareMedium + "'>");
      }
        $("#brewery-desc").html("<p>" + breweryResult.description + "<br>Website: " + breweryResult.website + "</p>");

        $.ajax({
          url: queryUrlBreweryLoc,
          method: "GET"
        }).done(function (response) {
          var breweryLocResult = response.data;
          console.log(breweryLocResult);

          if (breweryLocResult[0] === undefined){
            brewLat = breweryLocResult.latitude;
            brewLng = breweryLocResult.longitude;
          } else {
            brewLat = breweryLocResult[0].latitude;
            brewLng = breweryLocResult[0].longitude;
          }

          console.log(brewLat+" "+brewLng);

          initMap();

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
                        $("#beer-list").append("<div class = 'col-4'><img id = 'beer-" + i + "' src = '" + results[i].labels.medium + "'><br><p>" + results[i].name + "</p><br><p>Style: "+results[i].style.name+"</p><br><p>IBUs: "+results[i].ibu+"</p><br><p>ABV: "+results[i].abv+"</p><br></div>");
                      } else {
                        $("#beer-list").append("<div class = 'col-4'><img id = 'beer-" + i + "' src = 'http://via.placeholder.com/100+'><br><p>" + results[i].name + "</p><br><p>Style: "+results[i].style.name+"</p><br><p>IBUs: "+results[i].ibu+"</p><br><p>ABV: "+results[i].abv+"</p><br></div>");
                      }
                    }
                  });

                
  //insert google maps stuff

  function initMap() {
    var myLatLng = {lat: brewLat, lng: brewLng};
    console.log(myLatLng);

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  }



});

  });


});

});



