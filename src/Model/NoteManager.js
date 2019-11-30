import moment from "moment";
import {db} from "../Firebase/Firebase";

export class NoteManager {
  constructor(notes = []) {
	this.notes = notes;
  }

  findNoteIndexByID(noteID) {
	return this.notes.findIndex(note => note.id === noteID);
  }

  findNotesByTitle(noteTitle) {
	return this.notes.filter(note => note.title.trim().toLowerCase().includes(noteTitle.trim().toLowerCase()));
  }

  findNoteByID(noteID) {
	return this.notes.find(note => note.id === noteID);
  }

  addNote(note, updateRemote = true, callback = null) {
	this.notes.push(note);

	if (updateRemote) {
	  db
		.collection('notes')
		.add({...note})
		.then(callback)
		.catch(err => console.dir(err))
	}
  };

  editNote(updatedNote, updateRemote = true) {
	if (this.findNoteByID(updatedNote.id)) {
	  let noteToBeUpdated = this.findNoteByID(updatedNote.id);
	  noteToBeUpdated = updatedNote;
	  noteToBeUpdated.updatedAt = moment(moment(), 'DD/MM/YYYY').format('DD/MM/YYYY');

	  this.notes[this.findNoteIndexByID(updatedNote.id)] = noteToBeUpdated;
	}
  }

  deleteNoteByID(noteID, updateRemote = true) {
	if (this.findNoteByID(noteID)) {
	  this.notes.splice(this.findNoteIndexByID(noteID), 1);
	}
  }
}
