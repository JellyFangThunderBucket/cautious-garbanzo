// Minimal app logic: save a note to localStorage
const input = document.getElementById('noteInput');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const savedNotes = document.getElementById('savedNotes');

const STORAGE_KEY = 'pwa-notes-v1';

function load() {
  const json = localStorage.getItem(STORAGE_KEY) || '';
  savedNotes.textContent = json;
  input.value = json;
}

function save() {
  const val = input.value;
  localStorage.setItem(STORAGE_KEY, val);
  load();
}

function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
  load();
}

saveBtn.addEventListener('click', save);
clearBtn.addEventListener('click', clearAll);

load();
