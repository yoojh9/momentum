const COORDS = 'coords';
const API_KEY = "3b5b2c5a5d90ef09d98c467547d79f52";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lon){
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`;
  fetch(url)
  .then(res => res.json())
  .then(json => paintWeather(json))
  .catch(err => console.error(err))
}

function paintWeather(data){
  const temp = data.main.temp;
  const place = data.name;
  const icon = data.weather[0].icon;

  const span = document.createElement("span")
  const img = document.createElement("img");

  img.src = `http://openweathermap.org/img/w/${icon}.png`;
  img.width = 20;

  span.innerText = `${temp}˚C @ ${place}`;
  weather.appendChild(img);
  weather.appendChild(span);
}


function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coordsObj = {
    latitude,
    longitude
  };
  // 위에랑 같음
  // const coordsObj = {
  //   latitude : latitude,
  //   longitude : longitude
  // }
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.error("Cant access geo location")
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);

}

function loadCoords(){
  const loadedCords = localStorage.getItem(COORDS);
  if(loadedCords === null){
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();
