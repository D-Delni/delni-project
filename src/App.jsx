
import { useEffect } from 'react'
import { blockScrollX } from './assets/helper-functions/scrollUtils'
import Sidenav from './components/Sidenav'
import Home from './components/Home'
import Projects from './components/Projects'
import WorldMap from './components/WorldMap'
import Dividerbutton from './sections/DividerButton'
import LineAnimationv2 from './assets/animations/LineAnimationv2'


function App() {
  useEffect(()=>{
    blockScrollX();
  })
  return (
    <div>

        <Sidenav/>
        
        <Home/>
        <Dividerbutton className="scroll-smooth" targetSectionId="worldMap"></Dividerbutton> {/*Esto creo que va a ser mejor meterlo individualmente en cada section, con backround trasnparent*/}
        <WorldMap/>
        <Projects/>
    </div>
  )
}

export default App
