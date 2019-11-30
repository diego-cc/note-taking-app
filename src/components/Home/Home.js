import React from 'react';
import {THEMES} from "../../themes";

export const Home = props => {
  return (
	<div
	  style={{
		color: props.theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`,
		textAlign: 'center'
	  }}
	>
	  <h2
		style={{
		  textAlign: 'center',
		  color: props.theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`
		}}
	  >
		Welcome
	  </h2>
	  <p>This application allows you to add, edit, delete, search and browse notes.</p>
	  <p>To get started, click on the chevron on the bottom left corner of this page to navigate through this application
	  </p>
	  <p>The switch toggle on the top right corner of the application allows you to toggle dark mode. Give it a try!</p>
	</div>
  )
};
