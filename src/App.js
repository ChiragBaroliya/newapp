
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
      username: '',
      darkMode: false,
      favorites: JSON.parse(localStorage.getItem('favorites') || '[]')
    };
    handleToggleFavorite = (article) => {
      this.setState((prevState) => {
        const exists = prevState.favorites.some(fav => fav.url === article.url);
        let newFavorites;
        if (exists) {
          newFavorites = prevState.favorites.filter(fav => fav.url !== article.url);
        } else {
          newFavorites = [...prevState.favorites, article];
        }
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        return { favorites: newFavorites };
      });
    }
  }
  handleToggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
    // Optionally, persist dark mode preference
    localStorage.setItem('darkMode', !this.state.darkMode);
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
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (isAuthenticated) {
      this.setState({ isAuthenticated, username });
    }
    if (darkMode) {
      this.setState({ darkMode });
    }
  }

  render() {
    if (!this.state.isAuthenticated) {
      return <Login onLogin={this.handleLogin} />;
    }
    return (
      <div className={this.state.darkMode ? 'App dark-mode' : 'App'}>
        <NavBar
          onSearch={this.handleSearch}
          username={this.state.username}
          onLogout={this.handleLogout}
          darkMode={this.state.darkMode}
          onToggleDarkMode={this.handleToggleDarkMode}
        />
        <News
          searchQuery={this.state.searchQuery}
          favorites={this.state.favorites}
          onToggleFavorite={this.handleToggleFavorite}
        />
      </div>
    );
  }
}
