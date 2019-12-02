/**
 * AddNote.js
 */
import React, {useContext} from 'react';
import {Icon, notification} from "antd";
import {THEMES} from "../../Customisation/themes";
import {AddNoteForm} from "./AddNoteForm";
import {AppConsumer, AppContext} from "../../Context/Context";
import {Spinner} from "../Spinner/Spinner";

/**
 * Props for AddNote
 * @typedef {Object} AddNoteProps
 * @property {Function} onAddNote - calls the onAddNote handler on App.js
 */
/**
 * AddNote component - For the /add route
 * @param {AddNoteProps} props
 * @returns {*}
 * @constructor
 */
export const AddNote = props => {
  const {dismissAddedNoteNotification} = useContext(AppContext);

  const openNoteAddedNotification = () => {
	notification.open({
	  message: 'Notification',
	  description: 'Your note has been successfully added',
	  icon: <Icon type="check-circle" style={{color: 'green'}}/>,
	  duration: 3,
	  onClose: dismissAddedNoteNotification
	})
  };

  return (
	<AppConsumer>
	  {
		({theme, loading, addedNote}) => (
		  <>
			{
			  addedNote ?
				(
				  openNoteAddedNotification()
				) : ''
			}
			<h2
			  style={{
			    fontSize: '2.2rem',
				color: theme === THEMES.Light ?
					`rgba(0, 0, 0, 0.65)` :
					`rgba(255, 255, 255, 0.65)`,
				textAlign: 'center',
				marginBottom: '5rem'
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
