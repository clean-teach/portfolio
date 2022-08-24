const toDoForm = document.querySelector("#todo-list-form")
const toDoInput = toDoForm.querySelector("input")
const toDoList = document.querySelector("#todo-list")

const TO_DOS_KEY = 'todos';
let arrToDos = [];

loadToDos();
toDoForm.addEventListener('submit', handlerToDoSubmit);

function handlerToDoSubmit(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = '';
    const newToDoObj = {
        text: newToDo,
        id: Date.now()
    };
    arrToDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}
function paintToDo(newTodo){
    const elLi = document.createElement('li');
    const elSpan = document.createElement('span');
    elLi.id = newTodo.id;
    elSpan.innerText = newTodo.text;

    const elBtn = document.createElement('button');
    elBtn.innerText = '×';
    elBtn.addEventListener('click', handlerDeleteTodo)

    elLi.appendChild(elSpan);
    elLi.appendChild(elBtn);
    toDoList.appendChild(elLi);
}
function handlerDeleteTodo(evnet){
    const targetLi = evnet.target.parentNode;
    targetLi.remove()
    arrToDos = arrToDos.filter(toDo => toDo.id !== parseInt(targetLi.id));
    saveToDos();
}
function saveToDos(){
    localStorage.setItem(TO_DOS_KEY, JSON.stringify(arrToDos));
}
function loadToDos(){
    const savedToDos = localStorage.getItem(TO_DOS_KEY);

    if(savedToDos !== null){
        const parsedToDos = JSON.parse(savedToDos);
        arrToDos = parsedToDos;
        parsedToDos.forEach(paintToDo);
    }
}