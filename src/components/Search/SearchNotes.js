import React, {useContext, useState} from "react";
import {AutoComplete, Icon, Input, Select} from "antd";
import {AppContext} from "../../Context/Context";
import {useHistory} from 'react-router-dom';

const {Option} = Select;

export const SearchNotes = props => {
  const {noteManager} = useContext(AppContext);
  const history = useHistory();
  const [dataSource, setDataSource] = useState([]);

  const onSearch = searchText => {
	if (searchText.trim()) {
	  const {notes} = noteManager;
	  setDataSource(
		[...notes
		  .filter(note => (
			note.title.trim().toLowerCase().includes(searchText.trim().toLowerCase()) ||
			note.type.trim().toLowerCase().includes(searchText.trim().toLowerCase()) ||
			note.body.trim().toLowerCase().includes(searchText.trim().toLowerCase())
		  ))
		  .map(note =>
			note.title.length > 10 ? <Option key={note.id}>{`${note.title.slice(0, 10)}...`}</Option> : <Option key={note.id}>{note.title}</Option>
		  )]
	  )
	}
  };

  const onSelect = (value) => {
    if (value) {
	  history.push(`/browse/${value}`);
	}
  };

  return (
	<AutoComplete
	  dataSource={dataSource}
	  style={{width: '100%'}}
	  onSelect={onSelect}
	  onSearch={onSearch}
	  placeholder="Search notes..."
	>
	  <Input suffix={<Icon type="search" />} />
	</AutoComplete>
  )
};

