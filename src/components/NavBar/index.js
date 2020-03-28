import React from 'react'
import {Link} from '@reach/router'
import {Nav} from './styles'

export const NavBar = () =>  {

  return(
    <nav class="navbar navbar-expand-md navbar-light" style={{ background: 'white !important', borderBottom: '1px solid #EBEBEB'}}>
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
            <Link to="/" className="navbar-brand" > Estudiar </Link>
            </li>
        </ul>
    </div>
    
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" style={{fontWeight: 500}} href="#">Docs</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" style={{fontWeight: 500}} href="#">Helps</a>
            </li>
        </ul>
    </div>
</nav>
  )
}
