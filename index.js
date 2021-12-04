const styles = `
.container {
  border: 1px solid black;
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.days > div {
  text-align: center;
}
.row {
  display: flex;
  justify-content: space-between;
}
`;

const template = `
<div class="container">
  <div class="row">
    <button id="prevMonth">≤</button>
    <div class="month"></div>
    <div class="year"></div>
    <button id="nextMonth">≥</button>
  </div>
  <div class="days"></div>
</div>
`;

document.querySelector('head').innerHTML = `<style>${styles}</style>`;
document.querySelector('body').innerHTML = template;

const yearEl = document.querySelector('.year');
const monthEl = document.querySelector('.month');
const daysEl = document.querySelector('.days');

const prevMonthEl = document.querySelector('#prevMonth');
const nextMonthEl = document.querySelector('#nextMonth');

let currentDate;
render(new Date());

function shiftDate(n) {
  const v = new Date(currentDate.getFullYear(), currentDate.getMonth() + n, currentDate.getDate());
  render(v);
}

prevMonthEl.addEventListener('click', () => shiftDate(-1));

nextMonthEl.addEventListener('click', () => shiftDate(+1));

function addDay(num) {
  const dayEl = document.createElement('div');
  dayEl.textContent = num;
  daysEl.append(dayEl);
}

function render(selectedDate) {
  currentDate = selectedDate;
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  yearEl.textContent = year;
  monthEl.textContent = selectedDate.toLocaleString('default', { month: 'long' });
  daysEl.innerHTML = '';

  const lastDayOfTheMonth = new Date(year, month + 1, 0).getDate();

  const firstDayOfTheMonth = new Date(year, month, 1).getDay();
  const lastDayPrevMonth = new Date(year, month, 0).getDate();
  for(let i = firstDayOfTheMonth - 1; i >= 0; i--) {
    addDay(lastDayPrevMonth - i);
  }

  for(let i = 1; i <= lastDayOfTheMonth; i++) {
    addDay(i);
  }

  const lastWeekDayOfMonth = new Date(year, month + 1, 0).getDay();
  for(let i = lastWeekDayOfMonth; i < 6; i++) {
    addDay(i - lastWeekDayOfMonth + 1);
  }
}
