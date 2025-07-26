let currentDate = new Date();

function initCalendar() {
    updateCalendar();
    setupEventListeners();
}

function goToTodoPage() {
    window.location.href = "./../html/todo.html";
}
function setupEventListeners() {
    // 달력 네비게이션 버튼
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    const exportBtn = document.getElementById('export-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', previousMonth);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextMonth);
    }

    if (exportBtn) {
        exportBtn.addEventListener('click', exportMemo);
    }
}

function updateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const currentMonthEl = document.getElementById('current-month');
    if (currentMonthEl) {
        currentMonthEl.textContent = `${year}년 ${month + 1}월`;
    }

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;

    calendarGrid.innerHTML = '';

    // 요일 헤더
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // 날짜 셀
    const today = new Date();
    for (let i = 0; i < 42; i++) {
        const cellDate = new Date(startDate);
        cellDate.setDate(startDate.getDate() + i);

        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = cellDate.getDate();

        if (cellDate.getMonth() !== month) {
            dayCell.classList.add('other-month');
        }

        if (cellDate.toDateString() === today.toDateString()) {
            dayCell.classList.add('today');
        }

        calendarGrid.appendChild(dayCell);
    }
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
}

function exportMemo() {
    let memoText;
    const blob = new Blob([memoText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `memo_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 초기화
initCalendar()