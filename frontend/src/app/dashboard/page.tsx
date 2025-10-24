"use client";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, CreditCard, BarChart3, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Please log in to access your dashboard.</p>
          <Link href="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isVendor = user.role === "vendor";
  const isBuyer = user.role === "buyer";
  const isAdmin = user.role === "admin";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">
                  Supply Hero
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user.full_name}
              </span>
              <Button onClick={handleLogout} variant="ghost">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">
            Manage your {isVendor ? "vendor" : isBuyer ? "buyer" : "admin"} operations
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                +1 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345</div>
              <p className="text-xs text-muted-foreground">
                +20% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">
                +2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isVendor && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Management</CardTitle>
                  <CardDescription>
                    Track your products and manage stock levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/inventory">
                    <Button className="w-full">Manage Inventory</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Processing</CardTitle>
                  <CardDescription>
                    Process incoming orders and manage fulfillment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/orders">
                    <Button className="w-full">View Orders</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>
                    View performance metrics and insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/analytics">
                    <Button className="w-full">View Analytics</Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          )}

          {isBuyer && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Find Suppliers</CardTitle>
                  <CardDescription>
                    Discover and connect with verified suppliers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/suppliers">
                    <Button className="w-full">Browse Suppliers</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Place Orders</CardTitle>
                  <CardDescription>
                    Create and manage your purchase orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/orders">
                    <Button className="w-full">Place Order</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Track Shipments</CardTitle>
                  <CardDescription>
                    Monitor your order deliveries in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/shipments">
                    <Button className="w-full">Track Shipments</Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          )}

          {isAdmin && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage users, roles, and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/users">
                    <Button className="w-full">Manage Users</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                  <CardDescription>
                    Monitor platform performance and usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/platform-analytics">
                    <Button className="w-full">View Analytics</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure platform settings and integrations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard/settings">
                    <Button className="w-full">System Settings</Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
