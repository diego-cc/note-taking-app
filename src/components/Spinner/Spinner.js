import React from 'react';
import {Icon, Spin} from "antd";

export const Spinner = () => (
  <div style={{textAlign: 'center', marginTop: '5rem'}}>
	<Spin indicator={
	  <Icon
		type="loading"
		style={{
		  fontSize: '10rem'
		}}
	  />
	}
	/>
  </div>
);
