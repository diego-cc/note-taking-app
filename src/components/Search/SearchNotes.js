import React from 'react';
import {Input} from "antd";

const {Search} = Input;

export const SearchNotes = props => (
  <Search
	placeholder="Search for notes..."
	onSearch={value => console.log(value)}
  />
);
