const STORAGE_KEY = 'pregnancy-tracker-data';

const form = document.getElementById('pregnancyForm');
const dueDateInput = document.getElementById('dueDate');
const weightInput = document.getElementById('weight');
const bpInput = document.getElementById('bp');
const notesInput = document.getElementById('notes');
const resetBtn = document.getElementById('resetBtn');

const currentWeekEl = document.getElementById('currentWeek');
const currentMonthEl = document.getElementById('currentMonth');
const trimesterEl = document.getElementById('trimester');
const daysLeftEl = document.getElementById('daysLeft');

function calculatePregnancyInfo(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);

  if (Number.isNaN(due.getTime())) {
    return null;
  }

  const diffInMs = today - new Date(due.getFullYear(), due.getMonth(), due.getDate());
  const week = Math.max(1, Math.ceil((280 - (due - today) / (1000 * 60 * 60 * 24 * 7))));

  const daysLeft = Math.max(0, Math.ceil((due - today) / (1000 * 60 * 60 * 24)));
  const month = Math.max(1, Math.ceil((week + 1) / 4));

  let trimester = 'المرحلة الأولى';
  if (week > 13 && week <= 27) trimester = 'المرحلة الثانية';
  if (week > 27) trimester = 'المرحلة الثالثة';

  return { week, month, trimester, daysLeft };
}

function saveData() {
  const data = {
    dueDate: dueDateInput.value,
    weight: weightInput.value,
    bp: bpInput.value,
    notes: notesInput.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    dueDateInput.value = data.dueDate || '';
    weightInput.value = data.weight || '';
    bpInput.value = data.bp || '';
    notesInput.value = data.notes || '';
  } catch (error) {
    console.error('Failed to load saved data:', error);
  }
}

function updateSummary() {
  const dueDate = dueDateInput.value;
  if (!dueDate) {
    currentWeekEl.textContent = '--';
    currentMonthEl.textContent = '--';
    trimesterEl.textContent = '--';
    daysLeftEl.textContent = '--';
    return;
  }

  const info = calculatePregnancyInfo(dueDate);
  if (!info) return;

  currentWeekEl.textContent = `${info.week}`;
  currentMonthEl.textContent = `${info.month}`;
  trimesterEl.textContent = info.trimester;
  daysLeftEl.textContent = `${info.daysLeft}`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  saveData();
  updateSummary();
});

resetBtn.addEventListener('click', () => {
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  updateSummary();
});

loadData();
updateSummary();

dueDateInput.addEventListener('input', () => {
  saveData();
  updateSummary();
});
weightInput.addEventListener('input', saveData);
bpInput.addEventListener('input', saveData);
notesInput.addEventListener('input', saveData);
