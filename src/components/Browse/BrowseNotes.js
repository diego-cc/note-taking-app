import React from 'react';
import {THEMES} from "../../Customisation/themes";

export const BrowseNotes = props => (
  <div>
	<h2
	  style={{
		color: props.theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`
	  }}
	>
	  Browse notes
	</h2>
  </div>
);
