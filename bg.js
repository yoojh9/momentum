const body = document.querySelector('body');

const IMG_NUMBER = 6;

function handleImgLoad(){
  console.log("finised loaded");
}

function paintImage(imgNumber){
  const image = new Image();
  image.src=`images/${imgNumber+1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
  image.addEventListener("loaded", handleImgLoad)
}

function getRandom(){
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init(){
  const randomNumber = getRandom();
  paintImage(randomNumber);
  setInterval(paintImage(randomNumber), 1000*60*5);
}

init();
