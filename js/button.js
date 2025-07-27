import { sortTodosByCompleteDate, refreshTodoList } from './todo.js';

function filterTodo() {
    // 필터링 로직
    
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