import React from 'react';
import {THEMES} from "../../Customisation/themes";
import {AppConsumer} from "../../Context/Context";
import {ViewNote} from "./ViewNote";
import {Note} from "../../Model/Note";
import {TYPES} from "../../Model/Type";

export const BrowseNotes = props => (
  <AppConsumer>
	{
	  ({theme, noteManager}) => (
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
			noteManager.notes.map((note, index) => (
			  <ViewNote
				key={index}
				note={note}
			  />
			))
		  }
		</div>
	  )
	}
  </AppConsumer>
);
