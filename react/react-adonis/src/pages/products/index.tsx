import FormProduct from '@/components/products/form'
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

const ProductIndex = () => {
  const [data, setData] = useState<any[]>([])
  const [_, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const fetchProducts = async () => {
    setLoading(true)
    await axiosDynamic
      .get('/api/admin/products')
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = (id?: number) => {
    setLoading(true)
    axiosDynamic
      .delete(`/api/admin/products/${id}`)
      .then(() => {
        fetchProducts()
        toast.success('Product deleted successfully')
      })
      .catch((error) => {
        toast.error('Product deleted failed')
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
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your products</CardDescription>
          <CardAction>
            <DialogTrigger>Add Product</DialogTrigger>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell className="flex justify-center gap-0.5">
                      <DialogTrigger onClick={() => handleEdit(product.id)}>Edit</DialogTrigger>
                      <Button
                        className="bg-red-500 text-black"
                        onClick={() => handleDelete(product.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <FormProduct />
    </Dialog>
  )
}

export default ProductIndex
