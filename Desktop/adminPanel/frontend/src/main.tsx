import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthPage from './auth/AuthPage.tsx'
import ProductsPage from './pages/ProductsPage.tsx'


  const router = createBrowserRouter([
    {path: '/',
      element:<App/>,
      errorElement: <div>Error Page</div>,
      children:[
        {path: '/products',
          element: <ProductsPage/>
        },
        {path: '/auth',
          element:<AuthPage/>
        }
      ]
      
    }
  ])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
