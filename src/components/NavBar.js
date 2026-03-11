import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
  }

  handleInputChange = (e) => {
    this.setState({ search: e.target.value });
  }

  handleSearch = (e) => {
    e.preventDefault();
    if (this.props.onSearch) {
      this.props.onSearch(this.state.search);
    }
  }

  render() {
    const { username, onLogout } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">NewsMonkey</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">About</a>
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
  onLogout: PropTypes.func
};
}
