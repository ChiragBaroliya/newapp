import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.debounceTimeout = null;
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    this.setState({ search: value });
    if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      if (this.props.onSearch) {
        this.props.onSearch(value);
      }
    }, 500); // 500ms debounce
  }

  handleSearch = (e) => {
    e.preventDefault();
    if (this.props.onSearch) {
      this.props.onSearch(this.state.search);
    }
  }

  render() {
    const { username, onLogout, darkMode, onToggleDarkMode, onNav, page } = this.props;
    const { category, onCategoryChange } = this.props;
    const categories = [
      'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
    ];
    return (
      <div>
        <nav className={"navbar navbar-expand-lg " + (darkMode ? "navbar-dark bg-dark" : "bg-body-tertiary") }>
          <div className="container-fluid">
            <a className="navbar-brand" href="/">NewsMonkey</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button
                    className={"nav-link btn btn-link" + (page === 'news' ? ' active' : '')}
                    style={{ textDecoration: 'none', color: 'inherit', padding: 0 }}
                    onClick={() => onNav && onNav('news')}
                  >
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={"nav-link btn btn-link" + (page === 'favorites' ? ' active' : '')}
                    style={{ textDecoration: 'none', color: 'inherit', padding: 0 }}
                    onClick={() => onNav && onNav('favorites')}
                  >
                    Favorites
                  </button>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">About</a>
                </li>
                <li className="nav-item">
                  <select
                    className="form-select ms-2"
                    value={category}
                    onChange={e => onCategoryChange?.(e.target.value)}
                    style={{ width: 150 }}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </li>
              </ul>
              <form className="d-flex" role="search" onSubmit={this.handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search articles"
                  aria-label="Search"
                  value={this.state.search}
                  onChange={this.handleInputChange}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <button className={"btn ms-3 " + (darkMode ? "btn-light" : "btn-dark")}
                onClick={onToggleDarkMode}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              {username && (
                <div className="ms-3 d-flex align-items-center">
                  <span>Welcome, {username}</span>
                  <button className="btn btn-danger ms-2" onClick={onLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
NavBar.propTypes = {
  onSearch: PropTypes.func,
  username: PropTypes.string,
  onLogout: PropTypes.func,
  darkMode: PropTypes.bool,
  onToggleDarkMode: PropTypes.func,
  category: PropTypes.string,
  onCategoryChange: PropTypes.func,
  onNav: PropTypes.func,
  page: PropTypes.string
};
