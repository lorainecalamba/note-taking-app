'use strict';

import { Sweetalert } from './sweetalert.js';

export class Form {

  static createNote(notesLocal, type, subject, notes) {
    let notesArr = notesLocal;

    notesArr.push({
      id: notesArr.length + 1,
      type: type,
      subject: subject,
      notes: notes
    });

    localStorage.setItem('notes', JSON.stringify(notesArr));

    Sweetalert.resultMessage('success', 'Added Successfully', 'Note has been added');
  }

  static clearFields(type, subject, notes) {
    type.value = '';
    subject.value = '';
    notes.value = '';
  }

  static generateRandomID() {
    const randomID = Math.floor(Math.random() * 100) + Date.now();
    return randomID;
  }

}