import React, { Component } from 'react';
import './App.css';
import Contacts from '../Contacts';
import FontAwesome from 'react-fontawesome';

import { Container } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to  Phonebook App</h1>
        </header>

        <Container>
          <Contacts />
        </Container>

        <footer className="text-center">
            <p> Write for us FAQ's Helping Contact
                © Copyright 2018. All Rights Reserved.</p>
        </footer>
      </div>
    );
  }
}

export default App;
