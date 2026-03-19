import React from 'react';

const Profile = ({ username }) => {
  // You can expand this with more user info if needed
  return (
    <div className="container my-4">
      <div className="card mx-auto" style={{ maxWidth: 400 }}>
        <div className="card-body text-center">
          <h3 className="card-title mb-3">User Profile</h3>
          <div className="mb-2">
            <strong>Username:</strong> {username}
          </div>
          {/* Add more user info here if available */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
