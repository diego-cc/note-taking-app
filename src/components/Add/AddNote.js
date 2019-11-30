import React from 'react';
import {THEMES} from "../../themes";

export const AddNote = props => (
  <div>
	<h2
	  style={{
		color: props.theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`,
		textAlign: 'center'
	  }}
	>
	  Add a new note
	</h2>
  </div>
);
