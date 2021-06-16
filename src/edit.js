import { initializeEditPage, generateLastEdited } from './views';
import { updateNote, removeNote } from './notes';

const titleEl = document.querySelector('#note-title');
const bodyEl = document.querySelector('#note-body');
const removeEl = document.querySelector('#remove-note');
const dateEl = document.querySelector('#last-edited');
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

titleEl.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    title: e.target.value,
  });
  dateEl.textContent = generateLastEdited(note.updatedAt);
});

bodyEl.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    body: e.target.value,
  });

  dateEl.textContent = generateLastEdited(note.updatedAt);
});

removeEl.addEventListener('click', (e) => {
  removeNote(noteId);
  location.assign('/index.html');
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    initializeEditPage(noteId);
  }
});
