import React from 'react';
import './Loading.css';

function Loading({ ready, children }) {
  if (ready) {
    return children;
  }
  return <div className="spinner">
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div>;
}

export default Loading;
