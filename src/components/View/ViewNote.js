/**
 * ViewNote.js
 */
import React, {useContext} from 'react';
import {AppConsumer, AppContext} from "../../Context/Context";
import {THEMES} from "../../Customisation/themes";
import {Spinner} from "../Spinner/Spinner";
import {NoteCard} from "./NoteCard";
import {Button, Empty} from "antd";
import {useHistory, useParams} from 'react-router-dom';

/**
 * Props for ViewNote
 * @typedef {Object} ViewNoteProps
 * @property {Function} onEditNote - calls the onEditNote handler on App.js
 * @property {Function} onDeleteNote - calls the onDeleteNote handler on App.js
 */
/**
 * ViewNote component - It's rendered when the /browse/:noteID route is accessed
 * @param {ViewNoteProps} props
 * @returns {*}
 */
export const ViewNote = props => {
  const history = useHistory();
  const {noteID} = useParams();
  const {noteManager} = useContext(AppContext);
  const note = noteManager.findNoteByID(noteID);

  return (
	<AppConsumer>
	  {
		({theme, loading}) => (
		  <div style={{textAlign: 'center'}}>
			<h2
			  style={{
				fontSize: '2.5rem',
				textAlign: "center",
				color: theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`,
				marginBottom: '4rem'
			  }}
			>
			  View note: {note ? note.title : ''}
			</h2>
			{
			  loading ?
				<Spinner/> :
				note ?
				  <NoteCard
					onEditNote={props.onEditNote}
					onDeleteNote={props.onDeleteNote}
					note={note}
				  /> :
				  <Empty
					description={
					  <span
						style={theme === THEMES.Light ?
						  {color: 'rgba(0, 0, 0, .85)'} :
						  {color: 'rgba(255, 255, 255, .65)'}
						}>
						Note not found
					  </span>
					}
				  />
			}
			<Button
			  style={{marginTop: '5rem'}}
			  type="primary"
			  onClick={() => history.push(`/browse`)}
			>
			  Browse notes
			</Button>
		  </div>
		)
	  }
	</AppConsumer>
  )
};
