import React, {useContext} from 'react';
import {THEMES} from "../../Customisation/themes";
import {AddNoteForm} from "./AddNoteForm";
import {AppContext} from "../../Context/Context";

export const AddNote = props => {
  const {theme} = useContext(AppContext);

  return (
	<div>
	  <h2
		style={{
		  color: theme === THEMES.Light ?
			  `rgba(0, 0, 0, 0.65)` :
			  `rgba(255, 255, 255, 0.65)`,
		  textAlign: 'center'
		}}
	  >
		Add a new note
	  </h2>
	  <AddNoteForm onAddNote={props.onAddNote}/>
	</div>
  )
};
