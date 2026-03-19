import React, { useState } from 'react';

function Comments({ articleUrl, username }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('comments_' + articleUrl);
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const newComment = {
      user: username,
      text: comment,
      date: new Date().toLocaleString()
    };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem('comments_' + articleUrl, JSON.stringify(updatedComments));
    setComment('');
  };

  return (
    <div className="comments-section mt-3">
      <h6>Comments</h6>
      <form onSubmit={handleSubmit} className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Add a comment..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-sm mt-1">Post</button>
      </form>
      <div>
        {comments.length === 0 && <p className="text-muted">No comments yet.</p>}
        {comments.map((c, idx) => (
          <div key={idx} className="border rounded p-2 mb-1">
            <strong>{c.user}</strong> <span className="text-muted" style={{ fontSize: '0.8em' }}>{c.date}</span>
            <div>{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
