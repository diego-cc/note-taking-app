/**
 * Note.js
 */
import {TYPES} from './Type';
import moment from "moment";

const uuidv4 = require('uuid/v4');

/**
 * Base model class for a Note
 * @class Note
 */
export class Note {
  /**
   * Constructor for Note
   * @param {string} title - Title for the note
   * @param {string} body - Text for the note
   * @param {string} type - Type for the note (default: "Personal")
   * @param {Array<string>} tags - Tags for the note (default: empty array, not currently
   * implemented)
   * @param {string} id - Unique ID for the note (default: randomly generated uuid/v4)
   * @param {Date|string} createdAt - Date/time when the note was created (default: now)
   * @param {Date|string} updatedAt - Date/time when the note was last updated (default: null)
   */
  constructor(title, body, type = TYPES.Personal, tags = [], id = uuidv4(), createdAt = moment(moment(), 'DD/MM/YYYY hh:mm:ss A').format('DD/MM/YYYY hh:mm:ss A'), updatedAt = null) {
	this.title = title;
	this.body = body;
	this.type = type;
	this.tags = tags;
	this.id = id;
	this.createdAt = createdAt;
	this.updatedAt = updatedAt;
  }

  /**
   * Checks whether two notes have the same title, body and type
   * @param {Note} anotherNote - note to be compared
   * @returns {boolean}
   */
  hasSameContent(anotherNote) {
	return (this.title === anotherNote.title) &&
	  (this.body === anotherNote.body) &&
	  (this.type === anotherNote.type);
  }
}
