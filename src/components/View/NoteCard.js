/**
 * NoteCard.js
 */
import React, {useContext, useEffect, useState} from 'react';
import {AppConsumer, AppContext} from "../../Context/Context";
import {Card, Col, Collapse, Icon, Modal, Row, Skeleton, Typography} from "antd";
import {useHistory} from 'react-router-dom';

const {confirm} = Modal;
const {Meta} = Card;
const {Panel} = Collapse;
const {Text, Paragraph} = Typography;

/**
 * NoteCard component - renders a card containing details of a single note
 * @param {Note} note - The note to be rendered
 * @param {Function} onEditNote - calls the onEditNote handler on App.js
 * @param {Function} onDeleteNote - calls the onDeleteNote handler on App.js
 * @returns {*}
 */
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
	title: '',
	body: '',
	type: ''
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

  useEffect(() => {
	if (note) {
	  setNoteDetails({
		title: note.title.length > 10 ? `${note.title.slice(0, 10)}...` : note.title,
		body: note.body,
		type: note.type.length > 10 ? `${note.type.slice(0, 10)}...` : note.type
	  })
	}
  }, [note]);

  return (
	<AppConsumer>
	  {
		({theme, loading}) => (
		  <Row>
			<Col
			  xs={{
				span: 24
			  }}
			  md={{
				span: 12,
				offset: 6
			  }}
			  lg={{
				span: 8,
				offset: 8
			  }}
			>
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
						  title="View note details"
						  onClick={onViewNoteDetails}
						/>,
						<Icon
						  onClick={showConfirmDelete}
						  type="delete"
						  title="Delete"
						  key="delete"
						/>
						,
						<Icon
						  type="ellipsis"
						  key="ellipsis"
						  title="Expand note text"
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
			</Col>
		  </Row>
		)
	  }
	</AppConsumer>
  )
};
