import React from 'react';
import '../css/about.css'; // Import custom CSS file for AboutPage component
import notebookImage from '../css/image.png'; // Import the image file

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="content">
        <div className="text-container">
          <h1>About iNotebook</h1>
          <p>Welcome to iNotebook, a sleek and intuitive note-taking application designed to help you stay organized and productive.</p>
          <div className="about-us-image">
        <img id="image" src={notebookImage} alt="about-us" style={{ width: "300px", height: "300px" }} />
        </div>
          <h2>Features</h2>
          <ul>
            <li>Create and manage multiple notebooks for different purposes.</li>
            <li>Add, edit, and delete notes within each notebook.</li>
            <li>Organize notes with tags or categories.</li>
            <li>Search for specific notes using keywords or filters.</li>
            <li>Secure your notes with password protection.</li>
          </ul>
          
          <h2>Technologies Used</h2>
          <p>iNotebook is built using the following technologies:</p>
          <ul>
            <li>React.js: A JavaScript library for building user interfaces.</li>               
            <li>React Router: A routing library for handling navigation in a React application.</li>
            <li>Redux: A state management library for predictable state updates.</li>
            <li>CSS Modules: A CSS scoping solution to style React components.</li>
          </ul>
          
          <h2>Contact Us</h2>
          <p>If you have any questions, feedback, or suggestions, please feel free to contact us:</p>
          <ul>
            <li>Email: info@inotebook.com</li>
            <li>Phone: 123-456-7890</li>
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default AboutPage;
