import React, {useState} from 'react';
import {AppConsumer} from "../../Context/Context";
import {Card, Collapse, Icon, Typography} from "antd";

const {Meta} = Card;
const {Panel} = Collapse;
const {Text, Paragraph} = Typography;

export const ViewNote = ({note}) => {
  const [detailsActive, setDetailsActive] = useState(false);
  console.log('Details active:', detailsActive);

  const onChangeDetails = (detailName, detail) => {
	console.log(detailName, detail);
  };

  return (
	<AppConsumer>
	  {
		({theme}) => (
		  <Collapse
			activeKey={detailsActive ? '1' : ''}
		  >
			<Panel
			  showArrow={false}
			  key="1"
			  header={
				<Card
				  actions={[
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
				  <Meta
					title={<Text editable={true}>note.title</Text>}
					description={
					  <>
						<Text
						  editable={{
							onChange: detail => onChangeDetails('type', detail)
						  }}
						>
						  {note.type}
						</Text>
						<p>{note.createdAt}</p>
					  </>
					}
				  />
				</Card>
			  }
			>
			  <Paragraph
				editable={true}
				style={{textAlign: 'justify'}}
			  >
				{note.body}
			  </Paragraph>
			</Panel>
		  </Collapse>
		)
	  }
	</AppConsumer>
  )
};
