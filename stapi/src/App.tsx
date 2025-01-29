// import { useState } from 'react';
import './App.css';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="main_container">
        <header className="header">
          <h1>Star Trek</h1>
        </header>
        <main className="main"></main>
        <footer className="footer">
          <p className="footer_item">anastan588</p>
          <p className="footer_item">2025</p>
          <a
            className="footer_item github"
            href="https://github.com/anastan588"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;
