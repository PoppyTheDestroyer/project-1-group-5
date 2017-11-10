jQuery.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

var jqxhr = $.getJSON( "convertcsv.json", function() {
  console.log( "success" );
})
  .done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
 
// Perform other work here ...
var obj = findObjectByKey(jqxhr, 'ZIP', 77006);

console.log(obj);
 
// Set another completion function for the request above




//var queryURLbrewery = "http://api.brewerydb.com/v2/brewery/tfZkDt?key=35eff59e52d0da84d5ba657eab46cc81";
var queryURLbrewery = "http://api.brewerydb.com/v2/search/geo/point?lat=35.772096&lng=-78.638614&key=35eff59e52d0da84d5ba657eab46cc81";

var queryURLbeers = "http://api.brewerydb.com/v2/brewery/tfZkDt/beers?key=35eff59e52d0da84d5ba657eab46cc81";

  // Performing our AJAX GET request
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
    })

    $.ajax({
      url: queryURLbrewery,
      method: "GET"
    })
    // After the data comes back from the API
    .done(function(response) {
      var results = response.data;
      console.log(results);
      $("#brewery-name").text(results.name);
      $("#beers-by-brewery").text("Beers Made By "+results.name);
      $("#brewery-img").html("<img src='"+results.images.squareMedium+"'>");
      $("#brewery-desc").html("<p>"+results.description+"<br>Website: "+results.website+"</p>");
    })
