import { createBrowserRouter } from 'react-router'
import Layout from './components/layout/layout'
import ProductIndex from './pages/products'
import { Login } from './pages/auth/login'
import ProtectedRoute from './pages/protectedRoute'
import RolesIndex from './pages/roles'

const roleId = JSON.parse(String(localStorage.getItem('user'))).role_id

const router = createBrowserRouter([
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'products',
        element: <ProductIndex />,
      },
      {
        path: 'roles',
        element: <RolesIndex />,
      },
    ],
  },
  {
    path: '/',
    element: <Login />,
  },
])

export default router
