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
		.doc(note.id)
		.set({...note})
		.then(callback)
		.catch(err => console.error(err))
	}
  };

  editNote(updatedNote, updateRemote = true, callback = null) {
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
		  .then(callback)
		  .catch(err => console.error(err));
	  }
	}
  }

  deleteNoteByID(noteID, updateRemote = true) {
	if (this.findNoteByID(noteID)) {
	  this.notes.splice(this.findNoteIndexByID(noteID), 1);
	}
  }
}
