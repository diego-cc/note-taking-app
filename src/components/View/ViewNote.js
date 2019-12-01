import React, {useContext} from 'react';
import {AppConsumer, AppContext} from "../../Context/Context";
import {THEMES} from "../../Customisation/themes";
import {Spinner} from "../Spinner/Spinner";
import {NoteCard} from "./NoteCard";
import {Button, Empty} from "antd";
import {useHistory, useParams} from 'react-router-dom';

export const ViewNote = props => {
  const history = useHistory();
  const {noteID} = useParams();
  const {noteManager} = useContext(AppContext);
  const note = noteManager.findNoteByID(noteID);

  return (
	<AppConsumer>
	  {
		({theme, loading}) => (
		  <div style={{textAlign: 'center'}}>
			<h2
			  style={{
				textAlign: "center",
				color: theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`,
				marginBottom: '4rem'
			  }}
			>
			  View note: {note ? note.title : ''}
			</h2>
			{
			  loading ?
				<Spinner/> :
				note ?
				  <NoteCard note={note}/> :
				  <Empty
					description={
					  <p
						style={theme === THEMES.Light ?
						  {color: 'rgba(0, 0, 0, .85)'} :
						  {color: 'rgba(255, 255, 255, .65)'}
						}>
						Note not found
					  </p>
					}
				  />
			}
			<Button
			  style={{marginTop: '5rem'}}
			  type="primary"
			  onClick={() => history.push(`/browse`)}
			>
			  Browse notes
			</Button>
		  </div>
		)
	  }
	</AppConsumer>
  )
};
