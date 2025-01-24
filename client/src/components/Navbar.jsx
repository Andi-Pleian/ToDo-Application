import React from 'react'
import { Link } from 'react-router'
import logo from '../assets/logo.png'

/*
Check App.css => nav component

position fixed, top0, left0 => make navbar stay on top
display flex => make items in navbar stay on same line
align items center => align vertically center
justify content space between => make logo on left and links on right (makes gap between)
*/
function Navbar({active}) {
  return (
    <header>
      <nav>
        <div className='logo__wrapper'>
          <img src={logo} alt="logo"/>
          <h4>DoDo</h4>
        </div>

        <ul className="navigation-menu">   
          <li><Link to="/" className={active==='home' && 'activeNav'}>Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar