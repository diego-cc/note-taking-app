import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Input} from 'antd';
import {SideNav} from "../Nav/SideNav";
import {FONT_FACES} from "../../fontFaces";
import {THEMES} from "../../themes";
import {PathBreadcrumb} from "../PathBreadcrumb/PathBreadcrumb";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const {Search} = Input;

export class App extends React.Component {
  state = {
    fontFace: FONT_FACES.Muli,
    theme: THEMES.Light,
    paths: [`/`]
  };

  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <SideNav />
        <Layout>
          <Header style={{background: '#fff', padding: 0, textAlign: 'center'}}>
            Note taking app
          </Header>
          <Content style={{margin: '0 16px'}}>
            <PathBreadcrumb paths={this.state.paths} />
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>Bill is a cat.</div>
          </Content>
          <Footer style={{textAlign: 'center'}}>Copyright &copy; Diego C. 2019</Footer>
        </Layout>
      </Layout>
    )
  }
}