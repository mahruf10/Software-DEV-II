import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MainLayout from './Components/Shared/MainLayout.jsx'
import Home from './Components/Homepage/Home.jsx'
import AllProperties from './Components/Properties/AllProperties.jsx'
import AuthProvider from './Components/Authentication/AuthProvider.jsx'
import Login from './Components/Authentication/Login.jsx'
import Register from './Components/Authentication/Register.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      { path: '/', element: <Home></Home> },
      { path: 'allProperties', element: <AllProperties></AllProperties> }
    ]
  },
  { path: '/login', element: <Login></Login> },
  { path: '/register', element: <Register></Register> }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
)
