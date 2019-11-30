import React from 'react';
import {THEMES} from "../../Customisation/themes";

export const EditNote = props => (
  <div>
	<h2
	  style={{
		color: props.theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`
	  }}
	>Edit note</h2>
  </div>
);

