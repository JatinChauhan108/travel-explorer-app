import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import provider from './store/store.js'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux'

import {Home, Gallery, Favorites, Login} from './pages'

function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-gray-300">
        <p className="text-lg font-medium">🔒 Please login to view your favorites.</p>
      </div>
    );
  }

  return children;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element = {<App />}>
      <Route path = '/' element = {<Home />} />
      <Route path = '/login' element = {<Login />} />
      <Route path = '/gallery' element = {<Gallery />} />
      <Route path = '/favorites' element = {
        <PrivateRoute>
          <Favorites />
        </PrivateRoute>
      } />
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
