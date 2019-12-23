import React from 'react';
import logo from './logo.svg';
import './App.css';

var __html = require('./templates/home.html');
var template = { __html: __html };

function App() {
  return (
    <div dangerouslySetInnerHTML={template} />
  );
}

export default App;
