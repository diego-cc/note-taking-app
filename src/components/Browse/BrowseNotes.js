import React from 'react';
import {THEMES} from "../../Customisation/themes";
import {AppConsumer} from "../../Context/Context";
import {NoteCard} from "../View/NoteCard";
import {Empty} from "antd";
import {Spinner} from "../Spinner/Spinner";

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
				noteManager.notes.map((note, index) => (
				  <NoteCard
					onEditNote={props.onEditNote}
					key={index}
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
