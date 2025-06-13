// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/" replace />
  } else {
    return <Navigate to="/admin/products" replace />
  }

  return <>{children}</>
}
