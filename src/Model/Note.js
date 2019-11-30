import {TYPES} from './Type';
import moment from "moment";
const uuidv4 = require('uuid/v4');

export class Note {

  constructor(title, body, type = TYPES.Personal, tags = [], id = uuidv4(), createdAt = moment(moment(), 'DD/MM/YYYY hh:mm:ss A').format('DD/MM/YYYY hh:mm:ss A'), updatedAt = null) {
    this.title = title;
    this.body = body;
    this.type = type;
    this.tags = tags;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
