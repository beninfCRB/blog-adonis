// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  const token = localStorage.getItem('token')
  const url = location.pathname

  if (url.includes('/admin') && !token) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
