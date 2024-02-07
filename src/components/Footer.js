import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {

  return (
    <div data-testid="footer" style={{backgroundColor: "white", color: "black", padding:"5px"}}>
      <p data-testid="footer-text">Copyright &copy; 2023</p>
      <Link to="/Tasks">
        Tasks
      </Link>
    </div>
  )
}

export default Footer
