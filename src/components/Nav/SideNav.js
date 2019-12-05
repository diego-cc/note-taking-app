/**
 * SideNav.js
 */
import React, {useRef, useState} from 'react';
import {Icon, Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import {SearchNotes} from "../Search/SearchNotes";

const {Sider} = Layout;
const {SubMenu} = Menu;

/**
 * SideNav component - the side bar of this application
 * @param {"light"|"dark"} theme
 * @returns {*}
 */
export const SideNav = ({theme}) => {
  const [collapsed, setCollapsed] = useState(true);
  const siderRef = useRef(null);

  const handleSearchWhenCollapsed = e => {
    if (e.key === '1.1') {
      // search was clicked, check whether the sidebar is already collapsed
	  if (collapsed) {
	    console.log(siderRef.current);
	  }
	}
  }

  return (
	<Sider
	  theme={theme}
	  collapsible
	  collapsed={collapsed}
	  onCollapse={setCollapsed}
	>
	  <Menu
		onClick={handleSearchWhenCollapsed}
		theme={theme}
		mode="inline"
		inlineIndent={10}
	  >
		<Menu.Item key={0}>
		  <Link to="/">
			<Icon type="home"/>
			<span>Home</span>
		  </Link>
		</Menu.Item>
		<SubMenu
		  ref={siderRef}
		  popupClassName="popup-notes"
		  key={1}
		  title={
			<span>
              <Icon type="database"/>
              <span>Manage notes</span>
            </span>
		  }
		>
		  <Menu.Item
			key={1.1}
			style={{textAlign: 'center'}}
		  >
			<SearchNotes/>
		  </Menu.Item>
		  <Menu.Item key={1.2} style={{textAlign: 'center'}}>
			<Link to="/browse">
			  <Icon type="profile"/>
			  Browse
			</Link>
		  </Menu.Item>
		  <Menu.Item key={1.3} style={{textAlign: 'center'}}>
			<Link to="/add">
			  <Icon type="plus"/>
			  Add
			</Link>
		  </Menu.Item>
		</SubMenu>
	  </Menu>
	</Sider>
  );
};
