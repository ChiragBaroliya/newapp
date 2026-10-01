import React from 'react';

const About = () => (
  <div className="container my-4">
    <div className="card mx-auto" style={{ maxWidth: 600 }}>
      <div className="card-body">
        <h2 className="card-title mb-3">About NewsMonkey</h2>
        <p>
          <strong>NewsMonkey</strong> is a modern news aggregator built with React. It allows users to browse top headlines, search for news articles, bookmark favorites, and interact with the news community through comments.
        </p>
        <ul>
          <li>Browse top headlines by category</li>
          <li>Search for news articles</li>
          <li>Bookmark your favorite articles</li>
          <li>Comment on articles</li>
          <li>Light/Dark mode support</li>
          <li>Simple user authentication (local only)</li>
        </ul>
        <p className="mt-3">
          This project is for learning and demonstration purposes. News data is fetched from the NewsAPI.org service. No sensitive user data is stored or transmitted.
        </p>
        <p className="text-muted" style={{ fontSize: '0.9em' }}>
          &copy; {new Date().getFullYear()} NewsMonkey. All rights reserved.
        </p>
      </div>
    </div>
  </div>
);

export default About;
