import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: '' };
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  }

  render() {
    return (
      <div>
        <NavBar onSearch={this.handleSearch} />
        <News searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}
