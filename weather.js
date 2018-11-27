const COORDS = 'coords';
const API_KEY = "3b5b2c5a5d90ef09d98c467547d79f52";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lon){
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`;

  fetch(url)
  .then(res => res.json())
  .then(json => {
    const temp = json.main.temp;
    const place = json.name;
    weather.innerText = `${temp}˚C @ ${place}`;
  })
  .catch(err => console.error(err))
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
