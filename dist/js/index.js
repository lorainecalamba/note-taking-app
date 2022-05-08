'use strict';

import { Form } from './form.js';
import { Notes } from './notes.js';

// get all elements
const type = document.getElementById('type');
const subject = document.getElementById('subject');
const notes = document.getElementById('notes');
const formCreate = document.getElementById('create-note-form');
const formModify = document.getElementById('modify-note-form');
const editType = document.getElementById('edit-type');
const editSubject = document.getElementById('edit-subject');
const editNotes = document.getElementById('edit-notes');
const txtNoteIndex = document.getElementById('text-note-index');
const editNoteModal = document.getElementById('edit-notes-modal');

Notes.displayNotes();

let removeNoteBtn = document.querySelectorAll('.remove-note');
let editNoteBtn = document.querySelectorAll('.edit-note');

// remove note btn
removeNoteBtn.forEach(el => {
  el.addEventListener('click', function () {
    let noteIndex = el.dataset.index;
    console.log(noteIndex);
    Notes.removeNoteFromStorage(noteIndex);
  })
})

// edit note btn
editNoteBtn.forEach(el => {
  el.addEventListener('click', () => {
    let noteIndex = el.dataset.index;
    const notesArr = Notes.getNotes();

    // fill up forms in edit modal
    txtNoteIndex.value = noteIndex;
    editType.value = notesArr[noteIndex].type;
    editSubject.value = notesArr[noteIndex].subject;
    editNotes.value = notesArr[noteIndex].notes;
  })
});

// create notes on form submit
formCreate.addEventListener('submit', function (e) {
  e.preventDefault();

  let notesArr = Notes.getNotes();

  // class function to process add create form
  Form.createNote(notesArr, type.value, subject.value, notes.value);
  let index = notesArr.length - 1;

  console.log(index);

  // display notes
  let noteValues = {
    id: index,
    type: type.value,
    subject: subject.value,
    notes: notes.value
  };


  Notes.addNotesToDiv(noteValues, index);
  Form.clearFields(type, subject, notes);
  // Form.generateRandomID();
});

formModify.addEventListener('submit', function (e) {
  e.preventDefault();

  // update note
  Notes.updateNote(txtNoteIndex.value, editType.value, editSubject.value, editNotes.value);

  // close modal
  const bsModal = bootstrap.Modal.getInstance(editNoteModal);
  bsModal.hide();
});

