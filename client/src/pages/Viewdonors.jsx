import React from 'react'
import { Link } from 'react-router-dom'

function Viewdonors() {
  return (
    <div>
        <Link to={'/create-donor'}>
            Create
        </Link>

    </div>
  )
}

export default Viewdonors