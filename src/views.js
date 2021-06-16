import moment from 'moment';
import { getFilters } from './filters';
import { getNotes, sortNotes } from './notes';

// Generate DOM structure for a note
const generateNoteDOM = (note) => {
  const noteEl = document.createElement('a');
  const textEl = document.createElement('p');
  const statusEl = document.createElement('p');

  // Setup the note title text
  textEl.textContent = note.title.length > 0 ? note.title : 'Unnamed note';
  textEl.classList.add('list-item__title');
  noteEl.appendChild(textEl);

  // Setup the link
  noteEl.setAttribute('href', `/edit.html#${note.id}`);
  noteEl.classList.add('list-item');

  //Setup the status message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add('list-item__subtitle');
  noteEl.appendChild(statusEl);

  return noteEl;
};

// Render application notes
const renderNotes = () => {
  const filters = getFilters();
  const notesEl = document.querySelector('#notes');
  const notes = sortNotes(filters.sortBy);
  const filtersNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText)
  );

  notesEl.innerHTML = '';

  if (filtersNotes.length > 0) {
    filtersNotes.forEach((note) => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessageEl = document.createElement('p');
    emptyMessageEl.textContent = `No notes to show`;
    emptyMessageEl.classList.add('empty-message');
    notesEl.appendChild(emptyMessageEl);
  }
};

const initializeEditPage = (id) => {
  const titleEl = document.querySelector('#note-title');
  const bodyEl = document.querySelector('#note-body');
  const dateEl = document.querySelector('#last-edited');

  const notes = getNotes();
  const note = notes.find((note) => note.id === id);

  if (!note) {
    location.assign('/index.html');
  }

  titleEl.value = note.title;
  bodyEl.value = note.body;
  dateEl.textContent = generateLastEdited(note.updatedAt);
};

// Generate the last edited message
const generateLastEdited = (timestamp) =>
  `Last edited ${moment(timestamp).fromNow()}`;

export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage };
