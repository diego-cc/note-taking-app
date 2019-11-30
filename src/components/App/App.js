import React from 'react';
import {Col, Icon, Layout, Row, Select, Switch as ToggleSwitch, Typography} from 'antd';
import {SideNav} from "../Nav/SideNav";
import {Route, Switch} from 'react-router-dom';
import {FONT_FACES} from "../../Customisation/fontFaces";
import {THEMES} from "../../Customisation/themes";
import {Home} from "../Home/Home";
import {BrowseNotes} from "../Browse/BrowseNotes";
import {AddNote} from "../Add/AddNote";
import {EditNote} from '../Edit/EditNote';
import {DeleteNote} from '../Delete/DeleteNote';
import {NotFound} from "../404/NotFound";
import {NoteManager} from "../../Model/NoteManager";
import {AppProvider} from "../../Context/Context";

const {Content, Footer, Header} = Layout;

export class App extends React.Component {
  state = {
	noteManager: new NoteManager(),
	fontFace: FONT_FACES.Muli,
	theme: THEMES.Light,
	windowSize: ''
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

  onAddNote = note => {
	this.setState(prevState => {
	  const {noteManager} = prevState;
	  noteManager.addNote(note);

	  return ({noteManager})
	}, () => {
	  console.log('added a new note! note manager:');
	  console.dir(this.state.noteManager);
	})
  };

  onEditNote = updatedNote => {
	this.setState(prevState => {
	  const {noteManager} = prevState;
	  noteManager.editNote(updatedNote);

	  return ({noteManager})
	})
  };

  onDeleteNote = noteID => {
	this.setState(prevState => {
	  const {noteManager} = prevState;
	  noteManager.deleteNoteByID(noteID);

	  return ({noteManager})
	})
  };

  componentDidMount() {
	window.addEventListener('resize', this.setUpWindowSize);
	window.addEventListener('orientationChange', this.setUpWindowSize);

	// fetch notes from remote here
  }

  render() {
	return (
	  <AppProvider value={this.state}>
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
						 render={props => <Home {...props} />}/>
				  <Route path="/browse"
						 render={props => <BrowseNotes {...props} />}/>
				  <Route path="/add"
						 render={props =>
						   <AddNote
							 onAddNote={this.onAddNote}
							 {...props}
						   />
						 }
				  />
				  <Route path="/edit"
						 render={props =>
						   <EditNote
							 onEditNote={this.onEditNote}
							 {...props}
						   />
						 }
				  />
				  <Route path="/delete"
						 render={props =>
						   <DeleteNote
							 onDeleteNote={this.onDeleteNote} {...props}
						   />
						 }
				  />
				  <Route path="*" render={props => <NotFound {...props} />}/>
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
			Copyright &copy; 2019 Diego C.
		  </Footer>
		</Layout>
	  </AppProvider>
	)
  }
}
