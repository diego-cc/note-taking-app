import React from 'react';
import {THEMES} from "../../Customisation/themes";
import {AddNoteForm} from "./AddNoteForm";
import {AppConsumer} from "../../Context/Context";
import {Spinner} from "../Spinner/Spinner";

export const AddNote = props => {
  return (
	<AppConsumer>
	  {
		({theme, loading}) => (
		  <>
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
			{
			  loading ?
				<Spinner/> :
				<AddNoteForm onAddNote={props.onAddNote}/>
			}
		  </>
		)
	  }
	</AppConsumer>
  )
};
