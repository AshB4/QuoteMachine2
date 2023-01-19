import React, { useEffect, useState } from "react";
import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {

	state = { advice: '' };

	componentDidMount() {
		this.fetchAdvice();
	}

	fetchAdvice = () => {
		axios.get('https://api.adviceslip.com/advice')
		.then((response) => {
			const { advice } = response.data.slip;

			this.setState({ advice });
		})

		.catch ((error) => {
			console.log(error);
		})
	}

	render() {
		const { advice } = this.state;

		return (
			<div className="app">
				<div className="card">
					<h1 className="heading">
					{this.state.advice}
					</h1>
					<button className="button" onClick=
					{this.fetchAdvice}>
						<span>Give Me Advice</span>
					</button>
				</div>
			</div>
		);
	}
}

export default App;

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [hex, setHex] = useState("#fff");
  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = () => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((res) => res.json())
      .then((data) => {
        let dataQ = data.quotes;
        let ranNum = Math.floor(Math.random() * dataQ.length);
        let ranQ = dataQ[ranNum];
        setQuote(ranQ.quote);
        setAuthor(ranQ.author);
        setHex("#" + Math.floor(Math.random() * 16777215).toString(16));
      });
  };

  const NextQuote = () => {
    getQuotes();
  };
  return (
    <>
      <div className="container" style={{ backgroundColor: `${hex}` }}>
        <div className="row" id="random">
          <h1 className="h1 col-12 text-center text-white">
            Random Quote Generator with API
          </h1>
          <div className="col-md-3 col-sm-2"></div>
          <div className="col-md-6 col-sm-8" id="quote">
            <div className="quote" style={{ color: `${hex}` }}>
              {quote}
            </div>
            <div className="author text-end py-3" style={{ color: `${hex}` }}>
              ---{author}
            </div>
            <div className="text-center my-3">
              <button id="btn" className="py-2 px-3" onClick={NextQuote}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;