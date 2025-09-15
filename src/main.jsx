import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import provider from './store/store.js'
import { Provider } from 'react-redux'

import {Home, Gallery, Favorites, Login} from './pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element = {<App />}>
      <Route path = '/' element = {<Home />} />
      <Route path = '/login' element = {<Login />} />
      <Route path = '/gallery' element = {<Gallery />} />
      <Route path = '/favorites' element = {<Favorites />} />
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {provider}>
      <RouterProvider router = {router} />
    </Provider>
  </StrictMode>,
)
