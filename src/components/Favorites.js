import React from 'react';
import NewsItem from './NewsItem';

function Favorites({ favorites, onToggleFavorite }) {
  return (
    <div className="container my-3">
      <h2>Your Bookmarked Articles</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="row">
          {favorites.map((article, idx) => (
            <div className="col-md-4" key={article.url || idx}>
              <NewsItem
                title={article.title}
                description={article.description}
                imageUrl={article.urlToImage}
                newsUrl={article.url}
                isFavorite={true}
                onToggleFavorite={() => onToggleFavorite(article)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
