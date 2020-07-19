import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import logo from './logo.svg';
import CheckoutForm from "./CheckoutForm";
import './App.css';

const promise = loadStripe("pk_test_51H5tfUEz8jTvgCOpSN5H612QrG4ptDjAjm6mKxf1d8o60mnaI6ZBaCNsb409DzMQZyDPTREO6iRJhekxzvN3Ev7J00Lqk5Isoz");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
	</header>
	<p>
          Enter payment details below to receive daily basketball news for only $15/yr
        </p>
      <Elements stripe={promise}>
	<CheckoutForm />
      </Elements>

    </div>
  );
}

export default App;