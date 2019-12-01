import React, {useContext, useState} from 'react';
import {AppConsumer, AppContext} from "../../Context/Context";
import {Button, Card, Collapse, Icon, Skeleton, Typography, Modal} from "antd";
import {useHistory} from 'react-router-dom';

const {confirm} = Modal;
const {Meta} = Card;
const {Panel} = Collapse;
const {Text, Paragraph} = Typography;

export const NoteCard = ({note, onEditNote, onDeleteNote}) => {
  const {noteManager} = useContext(AppContext);
  const history = useHistory();

  const [detailsActive, setDetailsActive] = useState(false);
  const [isEditing, setIsEditing] = useState({
	title: false,
	body: false,
	type: false
  });

  const [noteDetails, setNoteDetails] = useState({
	title: note ? (note.title.length > 10 ? `${note.title.slice(0, 10)}...` : note.title) : '',
	body: note ? note.body : '',
	type: note ? (note.type.length > 10 ? `${note.type.slice(0, 10)}...` : note.type) : ''
  });

  const onEditingNote = detailName => {
	setIsEditing({
	  ...isEditing,
	  [detailName]: true
	});

	setNoteDetails({
	  ...noteDetails,
	  [detailName]: note[detailName]
	});
  };

  const onChangeDetails = (detailName, detail) => {
	setIsEditing({
	  ...isEditing,
	  [detailName]: false
	});

	if (note[detailName] !== detail) {
	  const updatedNote = {
		...note,
		[detailName]: detail
	  };

	  onEditNote(updatedNote, () => {
		const {title, type, body} = noteManager.findNoteByID(note.id);
		console.log('title sliced? ', title.length > 10 ? `${title.slice(0, 10)}...` : title);
		console.log('type sliced? ', type.length > 10 ? `${type.slice(0, 10)}...` : type);
		setNoteDetails({
		  title: title.length > 10 ? `${title.slice(0, 10)}...` : title,
		  type: type.length > 10 ? `${type.slice(0, 10)}...` : type,
		  body
		})
	  });
	} else {
	  setNoteDetails({
		...noteDetails,
		[detailName]: detail.length > 10 ? `${detail.slice(0, 10)}...` : detail
	  })
	}
  };

  const onViewNoteDetails = () => {
	history.push(`/browse/${note.id}`);
  };

  function showConfirmDelete() {
	confirm({
	  title: 'Are you sure that you want to delete this note?',
	  content: `${note.title} - ${note.type} (${note.createdAt})`,
	  onOk() {
		return new Promise((resolve, reject) => {
		  onDeleteNote(note.id, () => {
			resolve();
		  });
		})
		  .catch(() => console.log('Oops errors!'));
	  },
	  onCancel() {
	  },
	});
  }

  return (
	<AppConsumer>
	  {
		({theme, loading}) => (
		  <Collapse
			style={{marginBottom: '5rem'}}
			activeKey={detailsActive ? '1' : ''}
		  >
			<Panel
			  showArrow={false}
			  key="1"
			  header={
				<Card
				  actions={[
					<Icon
					  type="info-circle"
					  key="info"
					  onClick={onViewNoteDetails}
					/>,
					<Icon
					  onClick={showConfirmDelete}
					  type="delete"
					  key="delete"
					/>
					,
					<Icon
					  type="ellipsis"
					  key="ellipsis"
					  onClick={() => setDetailsActive(!detailsActive)}/>
				  ]}
				>
				  <Skeleton loading={loading} avatar active>
					<Meta
					  title={
						<Text
						  editable={{
							onChange: detail => onChangeDetails('title', detail),
							onStart: () => onEditingNote('title'),
							editing: isEditing.title
						  }}
						>
						  {noteDetails.title}
						</Text>
					  }
					  description={
						<>
						  <Text
							editable={{
							  onChange: detail => onChangeDetails('type', detail),
							  onStart: () => onEditingNote('type'),
							  editing: isEditing.type
							}}
						  >
							{noteDetails.type}
						  </Text>
						  <p
							style={{
							  marginTop: '2rem'
							}}
						  >
							Created at: {note.createdAt}
						  </p>
						  {
							note.updatedAt ?
							  <p>Last updated: {note.updatedAt}</p> :
							  ''
						  }
						</>
					  }
					/>
				  </Skeleton>
				</Card>
			  }
			>
			  <Paragraph
				editable={{
				  onChange: detail => onChangeDetails('body', detail),
				  onStart: () => onEditingNote('body'),
				  editing: isEditing.body
				}}
				style={{textAlign: 'justify'}}
			  >
				{noteDetails.body}
			  </Paragraph>
			</Panel>
		  </Collapse>
		)
	  }
	</AppConsumer>
  )
};
