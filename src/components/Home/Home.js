import React from 'react';
import {THEMES} from "../../Customisation/themes";
import {AppConsumer} from "../../Context/Context";

export const Home = props => {
  return (
	<AppConsumer>
	  {
		({theme}) => (
		  <div
			style={{
			  color: theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`,
			  textAlign: 'center'
			}}
		  >
			<h2
			  style={{
				textAlign: 'center',
				marginBottom: '4rem',
				color: theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`
			  }}
			>
			  Welcome
			</h2>
			<p>This application allows you to add, edit, delete, search and browse notes.</p>
			<p>To get started, click on the chevron on the bottom left corner to navigate through
			  the
			  windows.
			</p>
			<p>The switch toggle on the top right corner allows you to toggle dark mode. Give it a
			  try!</p>
		  </div>
		)
	  }
	</AppConsumer>
  )
};
