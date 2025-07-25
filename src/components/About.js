import React from 'react';

const About = () => {
  return (
    <div className="container my-4">
      <h1 className="mb-4">About iNote</h1>
      <p className="lead">
        iNote is a simple and efficient note-taking application that allows you to create, edit, and delete notes securely.
        With user authentication, your notes are private and accessible only to you.
      </p>
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Create Notes</h5>
              <p className="card-text">
                Quickly add new notes with a title, description, and optional tags to organize your thoughts.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-4 mt-md-0">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Edit & Delete</h5>
              <p className="card-text">
                Easily update or remove notes whenever you want, keeping your notes relevant and up to date.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-4 mt-md-0">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Secure Login</h5>
              <p className="card-text">
                Your notes are protected with secure login, ensuring only you can access your personal notes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
