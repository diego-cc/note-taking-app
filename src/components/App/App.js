import React from 'react';
import {Col, Icon, Layout, Menu, Row, Select, Switch as ToggleSwitch} from 'antd';
import {SideNav} from "../Nav/SideNav";
import {Route, Switch} from 'react-router-dom';
import {FONT_FACES} from "../../fontFaces";
import {THEMES} from "../../themes";
import {Home} from "../Home/Home";
import {BrowseNotes} from "../Browse/BrowseNotes";
import {AddNote} from "../Add/AddNote";
import {EditNote} from '../Edit/EditNote';
import {DeleteNote} from '../Delete/DeleteNote';
import {NotFound} from "../404/NotFound";

const {Content, Footer, Header} = Layout;
const {Option} = Select;

export class App extends React.Component {
  state = {
	fontFace: FONT_FACES.Muli,
	theme: THEMES.Light,
	paths: [`/`, `Add`, `Browse`]
  };

  switchPaths = paths => {
	this.setState({
	  paths
	})
  };

  onFontFaceChange = () => {
	this.setState(prevState => ({
	  fontFace: FONT_FACES.Muli
	}))
  };

  onThemeChange = () => {
	this.setState(prevState => ({
	  theme: prevState.theme === THEMES.Light ? THEMES.Dark : THEMES.Light
	}))
  };

  render() {
	return (
	  <Layout>
		<Header style={{
		  background: '#fff',
		  padding: 0
		}}>
		  <h1
			style={{
			  display: 'inline-block',
			  margin: 0,
			  padding: 0,
			  fontSize: '2.5rem',
			  textAlign: "center"
			}}>
			Note taking app
		  </h1>
		  <ToggleSwitch
			defaultChecked
			checkedChildren={<Icon type="bulb" />}
			unCheckedChildren={<Icon type="bulb" />}
		  />
		</Header>

		<Layout style={{minHeight: '100vh'}}>
		  <SideNav/>
		  <Content style={{margin: '0 1rem'}}>
			<div
			  style={{padding: '2rem', backgroundColor: '#e8e8e8'}}
			>
			  <Switch>
				<Route path="/" exact render={props => <Home {...props} />}/>
				<Route path="/browse" render={props => <BrowseNotes {...props} />}/>
				<Route path="/add" render={props => <AddNote {...props} />}/>
				<Route path="/edit" render={props => <EditNote {...props} />}/>
				<Route path="/delete" render={props => <DeleteNote {...props} />}/>
				<Route path="*" render={props => <NotFound {...props} />}/>
			  </Switch>
			</div>
		  </Content>
		</Layout>

		<Footer style={{textAlign: 'center'}}>Copyright &copy; Diego C. 2019</Footer>
	  </Layout>
	)
  }
}
