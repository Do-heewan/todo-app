import { sortTodosByCompleteDate, refreshTodoList, getTodos, setFilteredTodos } from './todo.js';

// 진행중 항목 필터링
function filterTodo() {
    const todos = getTodos();
    const filteredTodos = todos.filter(todo => 
        todo.completeState === 'todo' || todo.completeState === 'doing'
    );

    setFilteredTodos(filteredTodos);
    refreshTodoList();
}

// 완료 항목 필터링
function filterComplete() {
    const allTodos = getTodos();
    const filteredTodos = allTodos.filter(todo => 
        todo.completeState === 'complete'
    );
    setFilteredTodos(filteredTodos);
    refreshTodoList();
}

// 전체 항목 보기
function showAllTodos() {
    const allTodos = getTodos();
    setFilteredTodos(allTodos);
    refreshTodoList();
}

// 오름차순 버튼
// complete date 기준으로 정렬
function sortTodo() {
    sortTodosByCompleteDate();
    refreshTodoList();
}

// 전역으로 함수 노출
window.sortTodo = sortTodo;
window.filterTodo = filterTodo;
window.filterComplete = filterComplete;
window.showAllTodos = showAllTodos;