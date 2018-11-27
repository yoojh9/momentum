const toDoForm = document.querySelector('.js-todoForm'),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];


function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos!==null){
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach( todo => {
      console.log(todo.text);
      paintToDo(todo.text);
    })
  }
}


function deleteToDo(event){
  const btn = event.target
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // 필터는 array의 모든 아이템을 통해 함수를 실행하고, true인 아이템만 가지고 새로운 array를 만든다.
  const cleanToDos = toDos.filter(toDo => {
    return toDo.id !== parseInt(li.id)
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


function paintToDo(text){
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("i");
  const newId = toDos.length + 1;

  delBtn.className = "btn fas fa-trash-alt";
  delBtn.addEventListener("click", deleteToDo);

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id : newId
  }
  toDos.push(toDoObj);
  saveToDos();
}


function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value="";
}


function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
