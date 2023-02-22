import React from 'react'

import {About, Footer, Header, Skills, Work} from './container';
import { NavBar } from './components/NavBar';
import './App.scss';


const App = () => {
  return (
    <div className='app'>
        <NavBar/>
        <Header/>
        <About/>
        <Work/>
        <Skills/> 
        <Footer/>
        
    </div>

  )
}

export default App