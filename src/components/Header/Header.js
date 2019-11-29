import React from 'react';

export const Header = props => (
  <h1
	style={{
	  display: 'inline-block',
	  fontSize: '2rem',
	  textAlign: 'center',
	  letterSpacing: '.05rem'
	}}
  >
	{props.children}
  </h1>
);
