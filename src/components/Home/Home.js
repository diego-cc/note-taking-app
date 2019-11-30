import React from 'react';
import {THEMES} from "../../themes";

export const Home = props => {
  return (
    <div>
	  <h2 style={{
		color: props.theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`
	  }}>Home content</h2>
	</div>
  )
};
