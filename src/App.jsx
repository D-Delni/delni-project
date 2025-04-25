
import Sidenav from './components/Sidenav'
import Home from './components/Home'
import LineAnimationCascade from './assets/animations/LineAnimationCascade'
import LineAnimationv2 from './assets/animations/LineAnimationv2'
import LineAnimationV3 from './assets/animations/LineAnimationV3'
import LineAnimationV4 from './assets/animations/LineAnimationV4'
import VerticalAnimation from './assets/animations/LineAnimationPrototype/VerticalAnimation'

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
      {/*Aqui habria que poner algun div para manejar los componentes*/}
        <Sidenav/>
        <Home/>
        <WorldMap/>
        <VerticalAnimation/>
        <Projects/>
    </div>
  )
}

export default App
