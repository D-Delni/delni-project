
import Sidenav from './components/Sidenav'
import Home from './components/Home'
import LineAnimationCascade from './assets/animations/LineAnimationCascade'
import LineAnimationv2 from './assets/animations/LineAnimationv2'
import LineAnimationV3 from './assets/animations/LineAnimationV3'
import LineAnimationV4 from './assets/animations/LineAnimationV4'
import Projects from './components/Projects'
import WorldMap from './components/WorldMap'
import { useEffect } from 'react'
import { blockScrollX } from './assets/helper-functions/scrollUtils'

function App() {
  useEffect(()=>{
    blockScrollX();
  })
  return (
    <div>

        <Sidenav/>
        <Home/>
        <WorldMap/>
        <Projects/>
    </div>
  )
}

export default App
