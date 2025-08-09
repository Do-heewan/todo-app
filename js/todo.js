import { calculDDay } from "./utils.js";

// 날짜 반환
const year = document.querySelector(".today-year");
const month = document.querySelector(".today-month");
const day = document.querySelector(".today-day");

const date = new Date();
year.innerHTML = date.getFullYear();
month.innerHTML = formatNumber(date.getMonth() + 1); // 월은 0부터 시작하므로 +1
day.innerHTML = formatNumber(date.getDate());

// 월, 일이 한 자리 수일 경우 앞에 0을 붙이는 함수
function formatNumber(num) {
    return num < 10 ? `0${num}` : num;
}

// 리스트 아이템 관리
const list = document.querySelector(".todo-list");
const inputData = document.querySelector(".input__item-title");
const dateData = document.querySelector(".input__date");
const addBtn = document.querySelector(".input__add-btn");

let todos = [];
let filteredTodos = []; // 필터링된 todos 배열

addBtn.addEventListener("click", createNewTodo);

function createNewTodo() {
    const todo = {
        id: new Date().getTime(),
        title: inputData.value,
        completeDate: calculDDay(dateData.value) !== 0 ? calculDDay(dateData.value) : 0,
        completeState: "todo", // "todo", "doing", "done" 중 하나
    };
    todos.unshift(todo);
    
    const { todoEl } = createNewEl(todo);
    list.prepend(todoEl);

    inputData.value = "";
    dateData.value = "";

    saveLocalStorage();
}

{/* <div class="todo-list">
        <div class="todo">
            <button class="todo__checkbox"></button>
            <div class="todo__content">
                <input type="text" placeholder="항목" />
                <p>D-<span>0</span></p>
            </div>
            <button class="todo-btn edit-btn">편집</button>
            <button class="todo-btn remove-btn">X</button>
        </div>
    </div> */}

function createNewEl(todo) {
    const todoEl = document.createElement("div");
    todoEl.classList.add("todo");

    const checkboxEl = document.createElement("button");
    checkboxEl.classList.add("todo__checkbox");

    const contentEl = document.createElement("div");
    contentEl.classList.add("todo__content");

    const inputTextEl = document.createElement("input");
    inputTextEl.type = "text";
    inputTextEl.value = todo.title;
    inputTextEl.setAttribute("readonly", "true");

    const dateEl = document.createElement("p");
    dateEl.innerHTML = `D<span>${todo.completeDate === 0 ? "-Day" : todo.completeDate}</span>`; // D

    const editBtnEl = document.createElement("button");
    editBtnEl.classList.add("todo-btn", "edit-btn");
    editBtnEl.innerHTML = "편집";

    const removeBtnEl = document.createElement("button");
    removeBtnEl.classList.add("todo-btn", "remove-btn");
    removeBtnEl.innerHTML = "X";


    // 상태 변화에 따른 색상 적용 함수
    function setCheckboxColor(state) {
        const color = {
            todo: "gray",
            doing: "orange",
            complete: "yellowgreen",
        };
        checkboxEl.style.backgroundColor = color[state] || "gray";
    }
    setCheckboxColor(todo.completeState);

    checkboxEl.addEventListener("click", () => {
        // console.log("현재 상태: ", todo.completeState);

        if(todo.completeState === "todo") {
            todo.completeState = "doing";
        }
        else if(todo.completeState === "doing") {
            todo.completeState = "complete";
        }
        else if(todo.completeState === "complete") {
            todo.completeState = "todo";
        }
        setCheckboxColor(todo.completeState);
        saveLocalStorage();
    });

    inputTextEl.addEventListener("input", () => {
        todo.title = inputTextEl.value;
    });

    inputTextEl.addEventListener("blur", () => {
        inputTextEl.setAttribute("readonly", "true");
        
        saveLocalStorage();
    });

    editBtnEl.addEventListener("click", () => {
        inputTextEl.removeAttribute("readonly");
        inputTextEl.focus();
    });

    removeBtnEl.addEventListener("click", () => {
        todos = todos.filter(pres => pres.id !== todo.id);
        todoEl.remove();

        saveLocalStorage();
    });

    contentEl.append(inputTextEl);
    contentEl.append(dateEl);

    todoEl.append(checkboxEl);
    todoEl.append(contentEl);
    todoEl.append(editBtnEl);
    todoEl.append(removeBtnEl);

    return { todoEl, inputTextEl };
}

function saveLocalStorage() {
    const data = JSON.stringify(todos);
    localStorage.setItem("todo-list", data);
}

function displayTodos() {
    const data = localStorage.getItem("todo-list");
    
    if(data) {
        todos = JSON.parse(data);
    }

    for(let i = 0; i < todos.length; i++ ){
        let todo = todos[i];
        let { todoEl } = createNewEl(todo);
        list.append(todoEl);
    }
}

// 정렬 함수
function sortTodosByCompleteDate() {
    todos.sort((a, b) => b.completeDate - a.completeDate);
}

function refreshTodoList() {
    // 기존 리스트 초기화
    list.innerHTML = '';

    // 필터링된 todos가 있으면 그것을 사용, 없으면 전체 todos 사용
    const todosToDisplay = filteredTodos.length > 0 ? filteredTodos : todos;
    
    // 정렬된 todos 배열로 다시 렌더링
    todosToDisplay.forEach(todo => {
        const { todoEl } = createNewEl(todo);
        list.append(todoEl);
    });
    
    // localStorage에 저장
    saveLocalStorage();
}

// todos 배열 반환
function getTodos() {
    return todos;
}

// 필터링된 todos 배열 설정
function setFilteredTodos(filtered) {
    filteredTodos = filtered;
}

displayTodos();

export { sortTodosByCompleteDate, refreshTodoList, getTodos, setFilteredTodos };