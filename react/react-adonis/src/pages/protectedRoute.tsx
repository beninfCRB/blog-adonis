// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  const url = location.pathname

  if (url === '/admin' && !localStorage.getItem('token')) {
    return <Navigate to="/" replace />
  } else if (url === '/') {
    return <Navigate to="/admin/products" replace />
  }

  return <>{children}</>
}
