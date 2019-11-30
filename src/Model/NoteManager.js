import moment from "moment";

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

  addNote(note, updateRemote = true) {
	this.notes.push(note);
  };

  editNote(updatedNote, updateRemote = true) {
    if (this.findNoteByID(updatedNote.id)) {
      let noteToBeUpdated = this.findNoteByID(updatedNote.id);
      noteToBeUpdated = updatedNote;
      noteToBeUpdated.updatedAt = moment(moment(), 'DD/MM/YYYY').format('DD/MM/YYYY');

      this.notes[this.findNoteIndexByID(updatedNote.id)] = noteToBeUpdated;
	}
  }

  deleteNote(note, updateRemote = true) {
	if (this.findNoteByID(note.id)) {
	  this.notes.splice(this.findNoteIndexByID(note.id), 1);
	}
  }
}
