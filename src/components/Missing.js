import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <div data-testid="missing">
      <p>Page Does Not Exist</p>
      <Link to="/">Visit Our Website</Link>
    </div>
  )
}

export default Missing
