/**
 * NoteManager.js
 */
import moment from "moment";

let db;

if (process.env.NODE_ENV === 'development') {
  db = require('../Firebase/Firebase.dev').db;
} else {
  db = require('../Firebase/Firebase.prod').db;
}

/**
 * Manages all notes present in the application
 * @class NoteManager
 */
export class NoteManager {
  /**
   * Constructor for NoteManager
   * @param {Array<Note>} notes - All notes in the application (default: empty array)
   */
  constructor(notes = []) {
	this.notes = notes;
  }

  /**
   * Finds the index of a note in {@link notes} by its ID
   * @param {string} noteID - The ID of the note to be searched
   * @returns {number}
   */
  findNoteIndexByID(noteID) {
	return this.notes.findIndex(note => note.id === noteID);
  }

  /**
   * Finds all notes in {@link notes} whose title matches noteTitle
   * @param {string} noteTitle - Title to be searched
   * @returns {Note[]|[]}
   */
  findNotesByTitle(noteTitle) {
	return this.notes.filter(note => note.title.trim().toLowerCase().includes(noteTitle.trim().toLowerCase()));
  }

  /**
   * Finds a note in {@link notes} by its ID
   * @param {string} noteID - The ID of the note to be searched
   * @returns {Note|undefined}
   */
  findNoteByID(noteID) {
	return this.notes.find(note => note.id === noteID);
  }

  /**
   * Adds a note to {@link notes}
   * @param {Note} note - note to be added
   * @param {boolean} updateRemote - if true, also adds a note to the remote database (default: true)
   * @param {Function|null} onSuccess - called after the note is successfully added to the remote
   * database (default: null)
   * @param {Function|null} onError - called when an error occurs while trying to add a note to the
   * remote database (default: null)
   */
  addNote(note, updateRemote = true, onSuccess = null, onError = null) {
	this.notes.push(note);

	if (updateRemote) {
	  db
		.collection('notes')
		.doc(note.id)
		.set({...note})
		.then(onSuccess)
		.catch(err => onError(err))
	}
  };

  /**
   * Edits a note in {@link notes}
   * @param {Note} updatedNote - updated note, with the same ID of the original one
   * @param {boolean} updateRemote - if true, also edits the note in the remote database (default: true)
   * @param {Function|null} onSuccess - called after the note is successfully edited in the remote
   * database (default: null)
   * @param {Function|null} onError - called when an error occurs while trying to edit the note
   * in the remote database (default: null)
   */
  editNote(updatedNote, updateRemote = true, onSuccess = null, onError = null) {
	if (this.findNoteByID(updatedNote.id)) {
	  let noteToBeUpdated = this.findNoteByID(updatedNote.id);
	  noteToBeUpdated = updatedNote;
	  noteToBeUpdated.updatedAt = moment(moment(), 'DD/MM/YYYY hh:mm:ss A').format('DD/MM/YYYY hh:mm:ss A');

	  this.notes[this.findNoteIndexByID(updatedNote.id)] = noteToBeUpdated;

	  if (updateRemote) {
		db
		  .collection('notes')
		  .doc(updatedNote.id)
		  .update({...updatedNote})
		  .then(onSuccess)
		  .catch(err => onError(err));
	  }
	}
  }

  /**
   * Deletes a note in {@link notes}
   * @param {string} noteID - The ID of the note to be deleted
   * @param {boolean} updateRemote - if true, also deletes the note from the remote database (default: true)
   * @param {Function|null} onSuccess - called after the note is successfully deleted from the
   * remote
   * database (default: null)
   * @param {Function|null} onError - called when an error occurs while trying to delete the note
   * from the remote database (default: null)
   */
  deleteNoteByID(noteID, updateRemote = true, onSuccess = null, onError = null) {
	if (this.findNoteByID(noteID)) {
	  this.notes = this.notes.filter(note => note.id !== noteID);

	  if (updateRemote) {
		db
		  .collection('notes')
		  .doc(noteID)
		  .delete()
		  .then(onSuccess)
		  .catch(err => onError(err));
	  }
	}
  }
}
