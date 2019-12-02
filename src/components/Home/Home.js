/**
 * Home.js
 */
import React from 'react';
import {THEMES} from "../../Customisation/themes";
import {AppConsumer} from "../../Context/Context";
import {Icon} from "antd";

/**
 * Home component - It's rendered when the / route is accessed
 * @returns {*}
 */
export const Home = () => {
  return (
	<AppConsumer>
	  {
		({theme}) => (
		  <div
			style={{
			  fontSize: '1.8rem',
			  color: theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`,
			  textAlign: 'center'
			}}
		  >
			<h2
			  style={{
			    fontSize: '2.2rem',
				textAlign: 'center',
				marginBottom: '4rem',
				color: theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`
			  }}
			>
			  Welcome
			</h2>
			<p>This application allows you to add, edit, delete, search and browse notes.</p>
			<p>Each note is presented as a card, where:</p>
			<ul style={{listStyleType: 'none', fontWeight: 'bold'}}>
			  <li>Clicking on the <span><Icon title="View note"
											  type="info-circle"/></span> icon
				allows you to view details of an individual note on a separate page.
			  </li>
			  <li style={{marginTop: '2rem'}}>Clicking on the <span><Icon title="Edit" type="edit"/></span> icon
				allows you to edit the details of a note.
			  </li>
			  <li style={{marginTop: '2rem'}}>Clicking on the <span><Icon title="Delete note"
																		  type="delete"/></span> icon
				deletes a note (you will be prompted to confirm it).
			  </li>
			  <li style={{marginTop: '2rem'}}>Clicking on the <span><Icon title="Note text"
																		  type="ellipsis"/></span> icon
				expands a note's text.
			  </li>
			</ul>

			<p>If you get disconnected whilst using this application, your changes will be kept when
			  you're online again.</p>
			<p style={{marginBottom: '5rem'}}>The switch toggle on the top right corner allows you
			  to toggle dark mode. Give it a
			  try!</p>
			<p>To get started, click on the chevron on the bottom left corner to navigate through
			  the
			  windows.
			</p>
		  </div>
		)
	  }
	</AppConsumer>
  )
};
