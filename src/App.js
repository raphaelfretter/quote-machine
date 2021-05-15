import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import React, { Component } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTumblr, faTwitter } from '@fortawesome/free-brands-svg-icons';

const quotes = require('./assets/quotes.json').Quotes;
const colors = require('./assets/colors.json').Colors;

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <QuoteBox />
    );
  }
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    let quotenum = parseInt(Math.random() * quotes.length);
    let colornum = parseInt(Math.random() * colors.length);
    this.state = {
      quote: quotes[quotenum].quote,
      author: quotes[quotenum].author,
      color: colors[colornum],
      prevcolors: [colornum],
      prevquotes: [quotenum],
    }
    this.changeQuote = this.changeQuote.bind(this);
  }

  changeQuote() {
    let newquote = parseInt(Math.random() * quotes.length);
    let newcolor = parseInt(Math.random() * colors.length);
    this.setState((state) => {
      while (newcolor === state.prevcolors[state.prevcolors.length - 1] || newcolor === state.prevcolors[state.prevcolors.length - 2]) {
        newcolor = parseInt(Math.random() * colors.length);
      }
      while (newquote === state.prevquotes[state.prevquotes.length - 1] || newquote === state.prevquotes[state.prevquotes.length - 2]) {
        newquote = parseInt(Math.random() * quotes.length);
      }
      return {
        quote: quotes[newquote].quote,
        author: quotes[newquote].author,
        color: colors[newcolor],
        prevcolors: [...state.prevcolors, newcolor],
        prevquotes: [...state.prevquotes, newquote],
      }
    });
  }

  render() {
    const buttonClass = classNames('new-quote');
    return (
      <body className="App-header" style={{backgroundColor: this.state.color, transition: "all 1s ease"}}>
        <div className="quote-box">
          <div className="text" style={{color: this.state.color, transition: 'all 1s ease'}}>
              <i>{this.state.quote}</i>
            <div className="author" style={{color: this.state.color, transition: 'all 1s ease'}}>
              <b>- {this.state.author}</b>
              <div>
                <button className='twitter' onClick={() => window.open('https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + this.state.quote + '" \n-' + this.state.author))} style={{backgroundColor: this.state.color, transition: 'all 1s ease'}}><FontAwesomeIcon icon={faTwitter} /></button>
                <button className='tumblr'  onClick={() => window.open('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=' + encodeURIComponent(this.state.author) + '&content=' + encodeURIComponent(this.state.quote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button')} style={{backgroundColor: this.state.color, transition: 'all 1s ease'}}><FontAwesomeIcon icon={faTumblr} /></button>
                <button ref='button' className={buttonClass} onClick={this.changeQuote} style={{backgroundColor: this.state.color, transition: "all 1s ease"}}>New Quote</button>
              </div>
            </div>
          </div>
        </div>
        <i style={{fontSize: '0.5em', marginTop: '1em'}}>Created by Raphael Fretter</i>
      </body>
    );
  }
}

export default App;
