import React from 'react'
import { Link } from 'react-router-dom';

const Headers = (props) => {
  const {buttonText, formToggle} = props;
  return (
    <header data-testid="headers" className='headers'>
      <Link to="/">
        <h1>Task Tracker</h1>
      </Link>
      <div className='headersButton'>
        <button data-testid="header-button" onClick={() => formToggle()}>{buttonText ? "Open" : "Close" }</button>
      </div>
    </header>
  )
}

export default Headers
