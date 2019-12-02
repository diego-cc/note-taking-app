import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Note} from "./Model/Note";
import moment from "moment";

configure({adapter: new Adapter()});

const fakeNotes = [
  new Note('sad note', 'body 1', 'type 1', [], '1', moment(moment(), 'DD/MM/YYYY hh:mm:ss A').format('DD/MM/YYYY hh:mm:ss A')),
  new Note('happy note', 'body 2', 'type 2', [], '2', moment(moment().subtract(1, 'day'), 'DD/MM/YYYY hh:mm:ss A').format('DD/MM/YYYY hh:mm:ss A')),
  new Note('happy note 2', 'body 3', 'type 3', [], '3', moment(moment().add(2, 'days'), 'DD/MM/YYYY hh:mm:ss A').format('DD/MM/YYYY hh:mm:ss A')),
];

export {fakeNotes}
