// import { useState } from 'react';
import './App.css';
import { Component } from 'react';
import { SearchFieldComponent } from './components/searchField';

class App extends Component {
  // const [count, setCount] = useState(0);

  render() {
    return (
      <>
        <div className="main_container">
          <header className="header">
            <h1>Harry Potter Characters</h1>
          </header>
          <main className="main">
            <SearchFieldComponent></SearchFieldComponent>
          </main>
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
}

export default App;
