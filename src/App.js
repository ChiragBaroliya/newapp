import './App.css';

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import Login from './components/Login';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      isAuthenticated: false,
      username: ''
    };
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  }

  handleLogin = (username) => {
    this.setState({ isAuthenticated: true, username });
    // Optionally, store auth in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
  }

  handleLogout = () => {
    this.setState({ isAuthenticated: false, username: '' });
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  }

  componentDidMount() {
    // Restore auth state from localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const username = localStorage.getItem('username') || '';
    if (isAuthenticated) {
      this.setState({ isAuthenticated, username });
    }
  }

  render() {
    if (!this.state.isAuthenticated) {
      return <Login onLogin={this.handleLogin} />;
    }
    return (
      <div>
        <NavBar onSearch={this.handleSearch} username={this.state.username} onLogout={this.handleLogout} />
        <News searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}
