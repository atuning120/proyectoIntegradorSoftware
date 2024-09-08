import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Ejemplo,Ejemplo2} from './Ejmplo'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ejemplo />
    <Ejemplo2 />
  </StrictMode>,
)