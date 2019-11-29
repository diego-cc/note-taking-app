import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "antd";

export const NotFound = props => (
  <>
	<h2>Resource not found</h2>
	<Button type="link">
	  <Link to={`/`}>Home</Link>
	</Button>
  </>
);
