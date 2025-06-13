import FormProduct from '@/components/products/form'
import FormRoles from '@/components/roles/form'
import { SkeletonCard } from '@/components/skeleton'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import axiosDynamic from '@/utils/axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { toast } from 'react-toastify'

const RolesIndex = () => {
  const [data, setData] = useState<any[]>([])
  const [_, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)

  const fetchRoles = async () => {
    setLoading(true)
    await axiosDynamic
      .get('/api/admin/roles')
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
    setLoading(false)
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  const handleDelete = (id?: number) => {
    setLoading(true)
    axiosDynamic
      .delete(`/api/admin/roles/${id}`)
      .then(() => {
        fetchRoles()
        toast.success('Role deleted successfully')
      })
      .catch((error) => {
        toast.error('Role deleted failed')
      })
    setLoading(false)
  }

  const handleEdit = (id: number) => {
    setSearchParams({ id: id.toString() })
  }

  if (loading) return <SkeletonCard />

  return (
    <Dialog>
      <Card>
        <CardHeader>
          <CardTitle>Role</CardTitle>
          <CardDescription>Manage your role</CardDescription>
          <CardAction>
            <DialogTrigger>Add Role</DialogTrigger>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data?.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell className="flex justify-center gap-0.5">
                      <DialogTrigger onClick={() => handleEdit(role.id)}>Edit</DialogTrigger>
                      <Button
                        className="bg-red-500 text-black"
                        onClick={() => handleDelete(role.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <FormRoles />
    </Dialog>
  )
}

export default RolesIndex
