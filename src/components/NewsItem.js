import PropTypes from 'prop-types';

export default class NewsItem extends Component {
let {title,description,imageUrl, newsUrl}= this.props;
    return (
  render() {
    let { title, description, imageUrl, newsUrl, isFavorite, onToggleFavorite } = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
            <button
              className={"btn btn-sm ms-2 " + (isFavorite ? "btn-warning" : "btn-outline-warning")}
              onClick={onToggleFavorite}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? "★ Bookmarked" : "☆ Bookmark"}
            </button>
          </div>
        </div>
      </div>
    )
  }

NewsItem.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  imageUrl: PropTypes.string,
  newsUrl: PropTypes.string,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func
};
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewsItem extends Component {
  render() {
    const { title, description, imageUrl, newsUrl, isFavorite, onToggleFavorite } = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
            <button
              className={"btn btn-sm ms-2 " + (isFavorite ? "btn-warning" : "btn-outline-warning")}
              onClick={onToggleFavorite}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? "★ Bookmarked" : "☆ Bookmark"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

NewsItem.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  imageUrl: PropTypes.string,
  newsUrl: PropTypes.string,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func
};
