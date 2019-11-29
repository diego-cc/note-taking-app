import React, {useState} from 'react';
import {Icon, Menu, Layout, Input} from "antd";

const {Sider} = Layout;
const {SubMenu} = Menu;
const {Search} = Input;

export const SideNav = props => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <div className="logo"/>
      <Menu
        onSelect={(item, key, selectedKeys) => console.dir({item, key, selectedKeys})}
        theme="light"
        defaultSelectedKeys={['1']}
        mode="inline"
        inlineIndent={10}
      >
        <Menu.Item key="2">
          <Icon type="home"/>
          <span>Home</span>
        </Menu.Item>
        <SubMenu
          popupClassName="popup"
          key="sub1"
          title={
            <span>
              <Icon type="database"/>
              <span>Manage notes</span>
            </span>
          }
        >
          <Menu.Item
            key={3}>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
            />
          </Menu.Item>
          <Menu.Item key="4">Browse</Menu.Item>
          <Menu.Item key="5">Add</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};