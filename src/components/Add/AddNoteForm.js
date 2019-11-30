import React from 'react';

import {AutoComplete, Button, Form, Icon, Input, Popover, Select, Tooltip,} from 'antd';
import {TYPES} from "../../Model/Type";
import {AppConsumer, AppContext} from "../../Context/Context";
import {THEMES} from "../../Customisation/themes";
import {Note} from "../../Model/Note";

const {Option} = Select;

class AddNote extends React.Component {
  state = {
	confirmDirty: false
  };

  handleSubmit = e => {
	e.preventDefault();
	this.props.form.validateFieldsAndScroll((err, values) => {
	  if (!err) {
		const note = new Note(values.title, values.body, values.type);
		this.props.onAddNote(note);
	  }
	});
  };

  render() {
	const {getFieldDecorator} = this.props.form;

	const formItemLayout = {
	  labelCol: {
		xs: {span: 24},
		sm: {span: 8},
	  },
	  wrapperCol: {
		xs: {span: 24},
		sm: {span: 16},
	  },
	};
	const tailFormItemLayout = {
	  wrapperCol: {
		xs: {
		  span: 24,
		  offset: 0,
		},
		sm: {
		  span: 16,
		  offset: 8,
		},
	  },
	};

	return (
	  <AppConsumer>
		{({theme}) => (
		  <Form {...formItemLayout} onSubmit={this.handleSubmit}>
			<Form.Item
			  label={
				<span style={
				  theme === THEMES.Light ?
					{color: 'rgba(0, 0, 0, 0.85)'} :
					{color: 'rgba(255, 255, 255, 0.65)'}
				}>
			  		Title
		    	</span>
			  }
			  hasFeedback
			>
			  {getFieldDecorator('title', {
				rules: [
				  {
					required: true,
					message: 'Please enter a title',
				  },
				],
			  })(<Input/>)}
			</Form.Item>

			<Form.Item
			  label={
				<span style={
				  theme === THEMES.Light ?
					{color: 'rgba(0, 0, 0, 0.85)'} :
					{color: 'rgba(255, 255, 255, 0.65)'}
				}>
			  		Text
		    	</span>
			  }
			  hasFeedback
			>
			  {getFieldDecorator('body', {
				rules: [
				  {
					required: true,
					message: 'Please enter some text for your note',
				  }
				],
			  })(<Input.TextArea allowClear={true}/>)}
			</Form.Item>

			<Form.Item
			  label={
				<span style={
				  theme === THEMES.Light ?
					{color: 'rgba(0, 0, 0, 0.85)'} :
					{color: 'rgba(255, 255, 255, 0.65)'}
				}>
			  		Type <span>
					<Tooltip
					  title={
						<>
						  <p>Basic types are provided</p>
						  <p>You may change it later</p>
						</>
					  }>
					<Icon type="question-circle"/>
					</Tooltip>
				  </span>
		    	</span>
			  }
			>
			  {
				getFieldDecorator('Type', {
				  initialValue: TYPES.Personal
				})(
				  <Select>
					{
					  Object.values(TYPES).map((type, index) => (
						<Option key={index} value={type}>{type}</Option>
					  ))
					}
				  </Select>
				)
			  }
			</Form.Item>

			<Form.Item {...tailFormItemLayout}>
			  <Button type="primary" htmlType="submit">
				Add note
			  </Button>
			</Form.Item>
		  </Form>
		)}
	  </AppConsumer>
	);
  }
}

AddNote.contextType = AppContext;
const AddNoteForm = Form.create({name: 'addNote'})(AddNote);

export {AddNoteForm}
