import './styles/index.scss';
import NavBar from './components/NavBar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import { Skills } from './container';

function App() {

  return (
    <>
      <NavBar/>
      <Hero />
      <Services />
      <Skills/>
    </>
  )
}

export default App
