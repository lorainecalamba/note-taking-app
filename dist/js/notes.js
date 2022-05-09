'use strict';

import { Sweetalert } from './sweetalert.js';

export class Notes {
  static getNotes() {
    let notes;

    if (localStorage.getItem('notes') === null) {
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem('notes'));
    }
    return notes;
  }

  static displayNotes() {
    const notesArr = this.getNotes();

    notesArr.forEach((element, index) => this.addNotesToDiv(element, index));
  }

  static addNotesToDiv(element, index) {
    const notesContainer = document.getElementById('note-full-container');
    const classes = ['col-md-4', 'single-note-item', 'all-category', 'mt-3'];
    const div = document.createElement('div');

    div.setAttribute('id', `note-${index}`);
    div.classList.add(...classes);
    div.innerHTML = `
      <div class="card card-body">
        <span class="side-stick"></span>
        <h5
          class="note-title text-truncate w-75 mb-0"
          data-noteheading="${element.subject}"
        >
          ${element.subject} 
          <i class="point fa fa-circle ml-1 font-10"></i>
        </h5>
        <p class="note-date font-12 text-muted"></p>
        <div class="note-content">
          <p
            class="note-inner-content text-muted"
            data-notecontent="${element.notes}"
          >
          ${element.notes}
          </p>
        </div>
        <div class="d-flex gap-2 flex-row-reverse">
          <button type="button" data-bs-toggle="modal" data-bs-target="#edit-notes-modal" class="btn btn-info edit-note" data-index="${index}">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>

          <button type="button" yygu
          class="btn btn-danger remove-note" data-index="${index}">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
      `;
    notesContainer.appendChild(div);
  }

  // remove from local storage
  static removeNoteFromStorage(index) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const notesArr = this.getNotes();
        const arrIndex = index;
        const divContainer = document.getElementById('note-' + index);

        divContainer.remove();
        notesArr.splice(arrIndex, 1);

        localStorage.setItem('notes', JSON.stringify(notesArr));

        Sweetalert.resultMessage('success', 'Deleted Successfully', 'Note has been deleted');
      }
    })



  }

  static updateNote(index, type, subject, notes) {
    const notesArr = this.getNotes();

    notesArr[index].type = type;
    notesArr[index].subject = subject;
    notesArr[index].notes = notes;

    localStorage.setItem('notes', JSON.stringify(notesArr));

    Sweetalert.resultMessage('success', 'Successfully updated', 'Note has been updated');
  }
}