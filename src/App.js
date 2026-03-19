
import './App.css';

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import Login from './components/Login';
import Register from './components/Register';
import Favorites from './components/Favorites';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      isAuthenticated: false,
      username: '',
      darkMode: false,
      favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
      category: 'business',
      showRegister: false,
      page: 'news' // 'news' or 'favorites'
    };
    handleNav = (page) => {
      this.setState({ page });
    }
  }

  handleCategoryChange = (category) => {
    this.setState({ category });
  }

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
  handleToggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
    // Optionally, persist dark mode preference
    localStorage.setItem('darkMode', !this.state.darkMode);
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  }

  handleLogin = (username, password) => {
    // Check user credentials from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username] && users[username] === password) {
      this.setState({ isAuthenticated: true, username });
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      return true;
    }
    return false;
  }

  handleRegister = (username) => {
    this.setState({ isAuthenticated: true, username, showRegister: false });
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
  }

  handleSwitchToRegister = () => {
    this.setState({ showRegister: true });
  }

  handleSwitchToLogin = () => {
    this.setState({ showRegister: false });
  }

  handleLogout = () => {
    this.setState({ isAuthenticated: false, username: '' });
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  };

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
      if (this.state.showRegister) {
        return <Register onRegister={this.handleRegister} onSwitchToLogin={this.handleSwitchToLogin} />;
      } else {
        return <Login onLogin={this.handleLogin} onSwitchToRegister={this.handleSwitchToRegister} />;
      }
    }
    return (
      <div className={this.state.darkMode ? 'App dark-mode' : 'App'}>
        <NavBar
          onSearch={this.handleSearch}
          username={this.state.username}
          onLogout={this.handleLogout}
          darkMode={this.state.darkMode}
          onToggleDarkMode={this.handleToggleDarkMode}
          category={this.state.category}
          onCategoryChange={this.handleCategoryChange}
          onNav={this.handleNav}
          page={this.state.page}
        />
        {this.state.page === 'news' ? (
          <News
            searchQuery={this.state.searchQuery}
            favorites={this.state.favorites}
            onToggleFavorite={this.handleToggleFavorite}
            category={this.state.category}
          />
        ) : (
          <Favorites
            favorites={this.state.favorites}
            onToggleFavorite={this.handleToggleFavorite}
          />
        )}
      </div>
    );
  }
}
