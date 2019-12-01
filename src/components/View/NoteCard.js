import React, {useState} from 'react';
import {AppConsumer} from "../../Context/Context";
import {Card, Collapse, Icon, Skeleton, Typography} from "antd";
import {useHistory} from 'react-router-dom';

const {Meta} = Card;
const {Panel} = Collapse;
const {Text, Paragraph} = Typography;

export const NoteCard = ({note}) => {
  const history = useHistory();
  const [noteDetails, setNoteDetails] = useState({
	title: note ? note.title : '',
	body: note ? note.body : '',
	type: note ? note.type : ''
  });

  const [detailsActive, setDetailsActive] = useState(false);
  const [isEditing, setIsEditing] = useState({
	title: false,
	body: false,
	type: false
  });

  const onEditingNote = detailName => {
    setIsEditing({
	  ...isEditing,
	  [detailName]: true
	})
  };

  const onChangeDetails = (detailName, detail) => {
    setIsEditing({
	  ...isEditing,
	  [detailName]: false
	});

	setNoteDetails({
	  ...noteDetails,
	  [detailName]: detail
	})
  };

  const onViewNoteDetails = () => {
    history.push(`/browse/${note.id}`);
  };

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
					  type="delete"
					  key="delete"
					  onClick={() => console.log('on delete note')}
					/>,
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
						  {`${noteDetails.title.slice(0, 10)}...`}
					    </Text>
					  }
					  description={
						<>
						  <Text
							editable={{
							  onChange: detail => onChangeDetails('type', detail),
							  onStart: () => setIsEditing(true),
							  editing: isEditing.type
							}}
						  >
							{noteDetails.type}
						  </Text>
						  <p>{note.createdAt}</p>
						</>
					  }
					/>
				  </Skeleton>
				</Card>
			  }
			>
			  <Paragraph
				editable={true}
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
