import axiosDynamic from '@/utils/axios'
import { CircleArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'

const Topbar = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await axiosDynamic
      .post('/api/admin/logout')
      .then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
        toast.success('Logout successful')
        setLoading(false)
      })
      .catch((error) => {
        toast.error('Logout failed')
        setLoading(false)
      })
  }
  return (
    <div className="bg-background shadow-sm ml-0 mr-0 w-full">
      <div className="container mx-auto px-4 py-2 flex justify-end items-center">
        <div className="flex items-center space-x-4">
          <div
            className="flex flex-row h-8 w-auto items-center space-x-2 p-2 hover:bg-lime-50 hover:border-2 hover:cursor-pointer text-red-500 text-sm rounded-2xl"
            onClick={handleLogout}
          >
            <CircleArrowRight /> Logout
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
