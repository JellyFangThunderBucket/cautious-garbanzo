// Minimal app logic: save notes to localStorage
const input = document.getElementById('noteInput');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const savedNotes = document.getElementById('savedNotes');

const STORAGE_KEY = 'pwa-notes-v1';

function renderNotes() {
  const json = localStorage.getItem(STORAGE_KEY) || '';
  savedNotes.textContent = json;
}

function load() {
  const json = localStorage.getItem(STORAGE_KEY) || '';
  input.value = json;
  savedNotes.textContent = json;
}

function save() {
  const val = input.value;
  try {
    localStorage.setItem(STORAGE_KEY, val);
    renderNotes();
  } catch (e) {
    console.warn('Save failed (storage quota exceeded?):', e);
  }
}

function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
  input.value = '';
  savedNotes.textContent = '';
}

saveBtn.addEventListener('click', save);
clearBtn.addEventListener('click', clearAll);

load();
