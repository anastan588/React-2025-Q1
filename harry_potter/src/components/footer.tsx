import { Component } from 'react';

export class Footer extends Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}
