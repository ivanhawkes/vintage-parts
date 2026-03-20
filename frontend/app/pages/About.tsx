import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <p>ABOUT</p>
    </StrictMode>
  </BrowserRouter>,
 );
