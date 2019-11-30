import React, {useState} from 'react';
import {Icon, Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import {SearchNotes} from "../Search/SearchNotes";

const {Sider} = Layout;
const {SubMenu} = Menu;

export const SideNav = ({theme}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
	<Sider
	  theme={theme}
	  collapsible
	  collapsed={collapsed}
	  onCollapse={setCollapsed}
	>
	  <Menu
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
		  popupClassName="popup-notes"
		  key={1}
		  title={
			<span>
              <Icon type="database"/>
              <span>Manage notes</span>
            </span>
		  }
		>
		  <Menu.Item key={1.1} style={{textAlign: 'center'}}>
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
		  <Menu.Item key={1.4} style={{textAlign: 'center'}}>
			<Link to="/edit">
			  <Icon type="edit"/>
			  Edit
			</Link>
		  </Menu.Item>
		  <Menu.Item key={1.5} style={{textAlign: 'center'}}>
			<Link to="/delete">
			  <Icon type="delete"/>
			  Delete
			</Link>
		  </Menu.Item>
		</SubMenu>
	  </Menu>
	</Sider>
  );
};
