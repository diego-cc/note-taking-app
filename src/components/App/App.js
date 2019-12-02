/**
 * App.js
 */
import React from 'react';
import {Col, Icon, Layout, notification, Row, Switch as ToggleSwitch} from 'antd';
import {SideNav} from "../Nav/SideNav";
import {Route, Switch} from 'react-router-dom';
import {FONT_FACES} from "../../Customisation/fontFaces";
import {THEMES} from "../../Customisation/themes";
import {Home} from "../Home/Home";
import {BrowseNotes} from "../Browse/BrowseNotes";
import {AddNote} from "../Add/AddNote";
import {NotFound} from "../404/NotFound";
import {NoteManager} from "../../Model/NoteManager";
import {AppProvider} from "../../Context/Context";
import {db} from "../../Firebase/Firebase";
import {Note} from "../../Model/Note";
import {ViewNote} from "../View/ViewNote";

const {Content, Footer, Header} = Layout;

/**
 * App component - manages the various routes of this application
 */
export class App extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  noteManager: new NoteManager(),
	  fontFace: FONT_FACES.Muli,
	  theme: THEMES.Light,
	  windowSize: '',
	  loading: navigator.onLine,
	  addedNote: false,
	  deletedNote: false,
	  dismissAddedNoteNotification: this.dismissAddedNoteNotification,
	  dismissDeletedNoteNotification: this.dismissDeletedNoteNotification
	};

	/**
	 * Dismisses the notification shown after a note is added
	 * @param {Function|null} callback - Called after the notification is dismissed (default: null)
	 */
	this.dismissAddedNoteNotification = (callback = null) => {
	  this.setState({
		addedNote: false
	  }, callback)
	};

	/**
	 * Dismisses the notification shown after a note is deleted
	 * @param {Function|null} callback - Called after the notification is dismissed (default: null)
	 */
	this.dismissDeletedNoteNotification = (callback = null) => {
	  this.setState({
		deletedNote: false
	  }, callback)
	};
  }

  /**
   * Changes the font face of the application
   * (NOT CURRENTLY IMPLEMENTED)
   */
  onFontFaceChange = () => {
	this.setState(prevState => ({
	  fontFace: prevState.fontFace === FONT_FACES.Muli ? FONT_FACES.IndieFlower : FONT_FACES.Muli
	}))
  };

  /**
   * Changes the theme of the application
   */
  onThemeChange = () => {
	this.setState(prevState => ({
	  theme: prevState.theme === THEMES.Light ? THEMES.Dark : THEMES.Light
	}), () => {
	  // remember settings
	  localStorage.setItem('theme', JSON.stringify(this.state.theme));
	})
  };

  /**
   * Detects the width of the window for styling purposes
   * (This is a quick hack for inline styles, to override the styles injected by Ant Design)
   */
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

  /**
   * Adds a note (handled by {@link noteManager})
   * @param {Note} note - note to be added
   * @param {Function|null} callback - called after the note is added (default: null)
   */
  onAddNote = (note, callback = null) => {
	const {noteManager} = this.state;
	this.setState({
	  loading: true
	}, () => {
	  // if user if offline, stop loading after .5 sec
	  if (!navigator.onLine) {
		setTimeout(() => {
		  this.setState({
			loading: false,
			addedNote: true
		  }, () => {
			setTimeout(() => {
			  this.dismissAddedNoteNotification();
			}, 3000)
		  })
		}, 500);
	  }
	  noteManager.addNote(note, true, () => {
		this.setState({
		  noteManager,
		  loading: false,
		  addedNote: true
		}, () => {
		  setTimeout(() => {
			this.dismissAddedNoteNotification(callback);
		  }, 3000)
		})
	  }, err => {
		console.error(err);
	  })
	})
  };

  /**
   * Edits a note (handled by {@link noteManager})
   * @param {Note} updatedNote - note to be edited
   * @param {Function|null} callback - called after the note is edited (default: null)
   */
  onEditNote = (updatedNote, callback = null) => {
	this.setState(prevState => {
	  const {noteManager} = prevState;
	  noteManager.editNote(updatedNote);

	  return ({noteManager})
	}, callback)
  };

  onDeleteNote = (noteID, callback) => {
	this.setState(prevState => {
	  const {noteManager} = prevState;
	  noteManager.deleteNoteByID(noteID);

	  return ({
		noteManager,
		deletedNote: true
	  })
	}, () => {
	  callback();
	  setTimeout(() => {
		this.dismissDeletedNoteNotification();
	  }, 3000)
	})
  };

  componentDidMount() {
	if (!navigator.onLine) {
	  this.openNetworkNotification(
		'You seem to be offline',
		`Don't worry though, your changes will be synchronised when you go back online`
	  );
	}

	window.addEventListener('offline', () => {
	  if (!navigator.onLine) {
		this.openNetworkNotification(
		  'You seem to be offline',
		  `Don't worry though, your changes will be synchronised when you go back online`
		);
	  }
	});

	window.addEventListener('online', () => {
	  if (navigator.onLine) {
		this.openNetworkNotification(
		  'Back online! 🙂'
		)
	  }
	});

	window.addEventListener('resize', this.setUpWindowSize);
	window.addEventListener('orientationChange', this.setUpWindowSize);
	let theme;

	// get user settings, if any has been saved
	const themeJSON = localStorage.getItem('theme');
	if (themeJSON) {
	  theme = JSON.parse(themeJSON);
	  this.setState({theme})
	}
	// fetch notes from remote here
	db
	  .collection('notes')
	  .get()
	  .then(snap => {
		this.setState(prevState => {
		  const {noteManager} = prevState;
		  snap.forEach(doc => {
			const noteData = doc.data();
			const note = new Note(noteData.title, noteData.body, noteData.type, null, noteData.id, noteData.createdAt, noteData.updatedAt);
			noteManager.addNote(note, false);
		  });
		  return ({
			noteManager,
			loading: false
		  })
		})
	  })
	  .catch(err => {
		this.setState({
		  loading: false
		})
	  })
  }

  /**
   * Shows notifications related to network changes (online/offline)
   * @param {string} message - Title of the notification
   * @param {string|null} description - Body text of the notification (default: null)
   */
  openNetworkNotification = (message, description = null) => {
	notification.open({
	  message,
	  description
	})
  };

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
				  checked={this.state.theme === THEMES.Light}
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
				  <Route exact path="/browse"
						 render={props =>
						   <BrowseNotes
							 onDeleteNote={this.onDeleteNote}
							 onEditNote={this.onEditNote}
							 {...props}
						   />}
				  />

				  <Route path="/browse/:noteID"
						 render={props =>
						   <ViewNote
							 onEditNote={this.onEditNote}
							 onDeleteNote={this.onDeleteNote}
							 {...props}
						   />
						 }
				  />

				  <Route path="/add"
						 render={props =>
						   <AddNote
							 onAddNote={this.onAddNote}
							 {...props}
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
