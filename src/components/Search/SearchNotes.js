/**
 * SearchNotes.js
 */
import React, {useContext, useState} from "react";
import {AutoComplete, Icon, Input, Select} from "antd";
import {AppContext} from "../../Context/Context";
import {useHistory} from 'react-router-dom';
import './SearchNote.css';

const {Option} = Select;

/**
 * SearchNotes component - allows users to search for notes (rendered on the sidebar)
 * @returns {*}
 */
export const SearchNotes = () => {
  const {noteManager} = useContext(AppContext);
  const history = useHistory();
  const [dataSource, setDataSource] = useState([]);
  const [searchInput, setSearchInput] = useState(null);

  const filterNotes = (notes, searchText) => {
	return [
	  ...notes
		.filter(note => (
		  note.title.trim().toLowerCase().includes(searchText.trim().toLowerCase()) ||
		  note.type.trim().toLowerCase().includes(searchText.trim().toLowerCase()) ||
		  note.body.trim().toLowerCase().includes(searchText.trim().toLowerCase())
		))
	]
  };

  const onSearch = searchText => {
	if (searchText.trim()) {
	  const {notes} = noteManager;
	  setDataSource(
		filterNotes(notes, searchText)
		  .map(note =>
			note.title.length > 10 ?
			  <Option key={note.id} value={note.title}>{`${note.title.slice(0, 10)}...`}</Option> :
			  <Option key={note.id} value={note.title}>{note.title}</Option>
		  )
	  )
	}
  };

  const onSelect = (value, option) => {
	if (option && option.key) {
	  history.push(`/browse/${option.key}`);
	}
  };

  const onChange = value => {
	setSearchInput(value);
	if (!value.trim()) {
	  history.push(`/browse`);
	}
  };

  const onSearchButtonClicked = () => {
	const {notes} = noteManager;
	if (searchInput && notes) {
	  // when the user clicks the search button, navigate to the first result if at least one
	  // was found
	  const filteredNotes = filterNotes(notes, searchInput);
	  if (filteredNotes.length) {
		onSelect(null, {key: filteredNotes[0].id });
	  }
	}
  };

  return (
	<AutoComplete
	  backfill={true}
	  dataSource={dataSource}
	  style={{width: '100%'}}
	  onChange={onChange}
	  onSelect={onSelect}
	  onSearch={onSearch}
	  placeholder="Search notes..."
	>
	  <Input
		allowClear
		suffix={
		  <Icon title="Search for a note"
				onClick={onSearchButtonClicked}
				type="search"
		  />
		}
	  />
	</AutoComplete>
  )
};

