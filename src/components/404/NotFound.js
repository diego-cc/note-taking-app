/**
 * NoteFound.js
 */
import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "antd";

/**
 * NotFound component - To handle unknown routes
 * @returns {*}
 */
export const NotFound = () => (
  <>
	<h2>Resource not found</h2>
	<Button type="link">
	  <Link to={`/`}>Home</Link>
	</Button>
  </>
);
