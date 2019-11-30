import React from 'react';
import {Col, Icon, Layout, Row, Select, Switch as ToggleSwitch, Typography} from 'antd';
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
const {Title, Text} = Typography;

export class App extends React.Component {
  state = {
	fontFace: FONT_FACES.Muli,
	theme: THEMES.Light,
	paths: [`/`, `Add`, `Browse`],
	windowSize: ''
  };

  switchPaths = paths => {
	this.setState({
	  paths
	})
  };

  onFontFaceChange = () => {
	this.setState(prevState => ({
	  fontFace: prevState.fontFace === FONT_FACES.Muli ? FONT_FACES.IndieFlower : FONT_FACES.Muli
	}))
  };

  onThemeChange = () => {
	this.setState(prevState => ({
	  theme: prevState.theme === THEMES.Light ? THEMES.Dark : THEMES.Light
	}))
  };

  setUpWindowSize = () => {
	if (window.innerWidth < 376) {
	  this.setState({
		windowSize: 'xxs'
	  })
	} else if (window.innerWidth < 576) {
	  this.setState({windowSize: 'xs'});
	} else {
	  this.setState({windowSize: ''})
	}
  };

  componentDidMount() {
	window.addEventListener('resize', this.setUpWindowSize);
	window.addEventListener('orientationChange', this.setUpWindowSize);
  }

  render() {
	return (
	  <Layout>
		<Header
		  style={{
			padding: 0,
			backgroundColor: this.state.theme === THEMES.Light ? `rgba(255, 255, 255, 0.65)` : `#001529`
		  }}>
		  <Row>
			<Col span={8} offset={8}>
			  <h1
				style={{
				  margin: 0,
				  padding: 0,
				  fontSize: '2.5rem',
				  textAlign: "center",
				  color: this.state.theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`
				}}>
				Note taking app
			  </h1>
			</Col>
			<Col
			  sm={{
				span: 2,
				offset: 6
			  }}
			  xs={{
				span: 4,
				offset: 4
			  }}
			>
			  <ToggleSwitch
				onChange={this.onThemeChange}
				defaultChecked
				checkedChildren={<Icon type="bulb"/>}
				unCheckedChildren={<Icon type="bulb"/>}
			  />
			</Col>
		  </Row>
		</Header>

		<Layout style={{
		  minHeight: '100vh',
		  backgroundColor: this.state.theme === THEMES.Light ? `rgba(255, 255, 255, 0.65)` : `#001529`
		}}>
		  <SideNav theme={this.state.theme}/>
		  <Content style={{margin: '0 1rem'}}>
			<div
			  style={{
				padding: '2rem'
			  }}
			>
			  <Switch>
				<Route path="/" exact
					   render={props => <Home theme={this.state.theme} {...props} />}/>
				<Route path="/browse"
					   render={props => <BrowseNotes theme={this.state.theme} {...props} />}/>
				<Route path="/add"
					   render={props => <AddNote theme={this.state.theme} {...props} />}/>
				<Route path="/edit"
					   render={props => <EditNote theme={this.state.theme} {...props} />}/>
				<Route path="/delete"
					   render={props => <DeleteNote theme={this.state.theme} {...props} />}/>
				<Route path="*" render={props => <NotFound theme={this.state.theme} {...props} />}/>
			  </Switch>
			</div>
		  </Content>
		</Layout>

		<Footer
		  style={{
			textAlign: ((this.state.windowSize === 'xs') || (this.state.windowSize === 'xxs')) ? 'right' : 'center',
			backgroundColor: this.state.theme === THEMES.Light ? `rgba(255, 255, 255, 0.65)` : `#001529`,
			color: this.state.theme === THEMES.Light ? `rgba(0, 0, 0, 0.65)` : `rgba(255, 255, 255, 0.65)`,
			fontSize: '2rem'
		  }}
		>
		  Copyright &copy; Diego C. 2019
		</Footer>
	  </Layout>
	)
  }
}
