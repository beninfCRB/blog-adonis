import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import axiosDynamic from '@/utils/axios'

function InterceptorProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptor = axiosDynamic.interceptors.response.use(
      (config) => config,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/')
        }
        return Promise.reject(error)
      }
    )

    return () => axiosDynamic.interceptors.response.eject(interceptor)
  }, [navigate])

  return <>{children}</>
}

export default InterceptorProvider
