import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'

// Mock data
const stats = [
  { title: 'Stores', value: 24, change: 12, changeType: 'increase' },
  { title: 'Products', value: 156, change: -3, changeType: 'decrease' },
  { title: 'Orders', value: 89, change: 8, changeType: 'increase' },
  { title: 'Posts', value: 42, change: 15, changeType: 'increase' },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', status: 'Completed', amount: '$129.99' },
  { id: 'ORD-002', customer: 'Jane Smith', status: 'Pending', amount: '$79.50' },
  { id: 'ORD-003', customer: 'Bob Johnson', status: 'Shipped', amount: '$299.99' },
  { id: 'ORD-004', customer: 'Alice Brown', status: 'Processing', amount: '$49.99' },
]

const recentItems = [
  { id: '1', title: 'Wireless Headphones', type: 'Product', image: '/placeholder.jpg' },
  { id: '2', title: 'Summer Sale Post', type: 'Post', image: '/placeholder.jpg' },
  { id: '3', title: 'Smart Watch', type: 'Product', image: '/placeholder.jpg' },
  { id: '4', title: 'New Collection', type: 'Post', image: '/placeholder.jpg' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Quick Stat Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.changeType === 'increase' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change > 0 ? '+' : ''}{stat.change}%
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === 'Completed' ? 'default' :
                          order.status === 'Pending' ? 'secondary' :
                          order.status === 'Shipped' ? 'outline' : 'destructive'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Latest Products/Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Products & Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <Badge variant="outline">{item.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}