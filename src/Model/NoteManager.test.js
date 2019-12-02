import {NoteManager} from "./NoteManager";
import {fakeNotes} from '../setupTests';
import {TYPES} from "./Type";
import {Note} from "./Note";
import moment from "moment";

const cloneDeep = require('lodash.clonedeep');

const fakeNotesSafeCopy = cloneDeep(fakeNotes);
let notes;

beforeEach(() => {
  notes = cloneDeep(fakeNotesSafeCopy);
});

describe('Note Manager', () => {
  it(`Finds a note's index by its ID`, () => {
	const noteManager = new NoteManager(notes);

	expect(noteManager.findNoteIndexByID('1')).toBe(0);
  });

  it(`Finds notes by their title`, () => {
	const noteManager = new NoteManager(notes);

	expect(noteManager.findNotesByTitle('HAPPY').length).toBe(2);
  });

  it('Finds a note by its ID', () => {
	const noteManager = new NoteManager(notes);

	expect(noteManager.findNoteByID('1')).toBeDefined();
	expect(noteManager.findNoteByID('1000')).toBeUndefined();
  });

  it('Adds a note', () => {
	const noteManager = new NoteManager(notes);
	noteManager.addNote(new Note('prelude', 'a new decade is born', TYPES.Personal), false);

	expect(noteManager.notes.length).toBe(4);
  });

  it('Edits a note', () => {
	const noteManager = new NoteManager(notes);
	const updatedNote = new Note('bittersweet note', notes[0].body, notes[0].type, notes[0].tags, notes[0].id, notes[0].createdAt, moment(moment(), 'DD/MM/YYYY hh:mm:ss A').format('DD/MM/YYYY hh:mm:ss A'));

	noteManager.editNote(updatedNote, false);
	expect(noteManager.notes[0].title).toBe('bittersweet note');
  });

  it('Deletes a note', () => {
	const noteManager = new NoteManager(notes);
	noteManager.deleteNoteByID(notes[0].id, false);

	expect(noteManager.notes.length).toBe(2);
  });
});
