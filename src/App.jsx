import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import Root from './Components/Root/Root'
import Home from './Components/Home/Home'
import Login from './Components/Pages/Login'
import Register from './Components/Pages/Register'
import ForgotPassword from './Components/Pages/ForgotPassword'
import ToyDetails from './Components/Pages/ToyDetails'
import Profile from './Components/Pages/Profile'
import Community from './Components/Pages/Community'
import LegalPage from './Components/Pages/LegalPage'
import Error from './Components/Error/Error'
import ProtectedRoute from './Components/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      {
        path: 'toys/:toyId',
        element: <ProtectedRoute><ToyDetails /></ProtectedRoute>,
      },
      {
        path: 'profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: 'community',
        element: <ProtectedRoute><Community /></ProtectedRoute>,
      },
      { path: 'terms', element: <LegalPage kind="terms" /> },
      { path: 'privacy', element: <LegalPage kind="privacy" /> },
      { path: '*', element: <Error /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
