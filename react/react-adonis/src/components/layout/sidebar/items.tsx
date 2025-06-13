import { Calendar, Home, Inbox, Search, Settings, User } from 'lucide-react'

export const items = [
  {
    title: 'Product',
    url: '/admin/products',
    icon: Home,
    role: ['user', 'admin'],
  },
  {
    title: 'Role',
    url: '/admin/roles',
    icon: User,
    role: ['admin'],
  },
]
