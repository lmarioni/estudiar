import React from 'react'
import {Link} from '@reach/router'
import {Nav} from './styles'

export const NavBar = () =>  {

  return(
    <nav className="navbar navbar-expand-md navbar-light" style={{ background: 'white !important', borderBottom: '1px solid #EBEBEB'}}>
    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <Link to="/" className="navbar-brand" > Estudi.ar </Link>
            </li>
        </ul>
    </div>
    
    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" style={{fontWeight: 500}} href="#">Docs</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" style={{fontWeight: 500}} href="#">Helps</a>
            </li>
        </ul>
    </div>
</nav>
  )
}
