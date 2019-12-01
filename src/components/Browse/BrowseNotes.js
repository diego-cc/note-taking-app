import React from 'react';
import {THEMES} from "../../Customisation/themes";
import {AppConsumer} from "../../Context/Context";
import {NoteCard} from "../View/NoteCard";
import {Empty} from "antd";
import {Spinner} from "../Spinner/Spinner";
import moment from "moment";

export const BrowseNotes = props => (
  <AppConsumer>
	{
	  ({theme, noteManager, loading}) => (
		<div>
		  <h2
			style={{
			  textAlign: "center",
			  color: theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`,
			  marginBottom: '4rem'
			}}
		  >
			Browse notes
		  </h2>
		  {
			loading ?
			  <Spinner/> :
			  noteManager.notes.length ?
				noteManager
				  .notes
				  .sort((note1, note2) => {
					if (note1.updatedAt && !note2.updatedAt) {
					  return -1;
					} else if (!note1.updatedAt && note2.updatedAt) {
				      return 1;
					}
					else if (note1.updatedAt && note2.updatedAt) {
					  return moment(note2.updatedAt, 'DD/MM/YYYY hh:mm:ss A').diff(moment(note1.updatedAt, 'DD/MM/YYYY hh:mm:ss A'))
					} else {
					  return moment(note2.createdAt, 'DD/MM/YYYY hh:mm:ss A').diff(moment(note1.createdAt, 'DD/MM/YYYY hh:mm:ss A'))
					}
				  })
				  .map(note => (
					<NoteCard
					  onDeleteNote={props.onDeleteNote}
					  onEditNote={props.onEditNote}
					  key={note.id}
					  note={note}
					/>
				  )) : <Empty
				  description={
					<span
					  style={theme === THEMES.Light ?
						{color: 'rgba(0, 0, 0, .85)'} :
						{color: 'rgba(255, 255, 255, .65)'}
					  }>
						No notes to display
					  </span>
				  }
				/>
		  }
		</div>
	  )
	}
  </AppConsumer>
);
