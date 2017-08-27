var wallpaper = document.getElementsByClassName('wall')[0];
var cityDiv = document.getElementsByTagName('h2')[0];
var weatherDiv = document.getElementsByTagName('h2')[1];
var tempDiv = document.getElementsByTagName('h2')[2];
var pressDiv = document.getElementsByTagName('h2')[3];
var windDiv = document.getElementsByTagName('h2')[4];
var fBtn = document.getElementsByClassName('btn')[0];

if (navigator.geolocation) {
  window.onload = function () {
    var currentPosition;
    function getCurrentLocation (position) {
      currentPosition = position;
      latitude = currentPosition.coords.latitude;
      longitude = currentPosition.coords.longitude;

      $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=c4af27db5c05c9eb530a63fa8c4806f6', function (data) {
        var rawJson = JSON.stringify(data);
        var json = JSON.parse(rawJson);
        console.log(json);
        displayData(json);
      });
    }
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  }
  function displayData(json) {
    cityDiv.innerHTML = "Location: " + json.name + ", " + json.sys.country;
    weatherDiv.innerHTML = "Weather: " + json.weather[0].main;
    tempDiv.innerHTML = "Temperature: " + Math.floor(json.main.temp - 272) + " °C";
    pressDiv.innerHTML = "Pressure: " + json.main.pressure + " hpa";
    windDiv.innerHTML = "Wind speed: " + json.wind.speed + " m/s";
    wallpaper.style.backgroundImage = "url('images/" + json.weather[0].main + ".jpg')";
    console.log(wallpaper.style.backgroundImage);
    console.log(json.weather[0].main);

    fBtn.addEventListener('click', function () {
      var kelToCel = Math.floor(json.main.temp - 272);
      var kelToFah = Math.floor(9/5 * (json.main.temp - 272) + 32);
      if (tempDiv.innerHTML == "Temperature: " + Math.floor(json.main.temp - 272) + " °C") {
        tempDiv.innerHTML = "Temperature: " + kelToFah + " °F";
      } else {
        tempDiv.innerHTML = "Temperature: " + kelToCel + " °C";
      }
    });
  }
}
