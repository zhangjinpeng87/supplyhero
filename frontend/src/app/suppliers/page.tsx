"use client";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Globe, Package, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Supplier {
  id: number;
  company_name: string;
  business_type: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  logo_url?: string;
  rating: number;
  total_orders: number;
  matching_score: number;
  specialties: string[];
  location: string;
}

export default function SuppliersPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    // Fetch suppliers with AI matching scores
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // const response = await api.get("/api/suppliers/matching");
        // setSuppliers(response.data);
        
        // Mock data for now
        const mockSuppliers: Supplier[] = [
          {
            id: 1,
            company_name: "TechParts Solutions",
            business_type: "Electronics Components",
            description: "Leading supplier of electronic components and computer parts with 15+ years of experience in the industry.",
            address: "123 Tech Street, Silicon Valley, CA",
            phone: "+1 (555) 123-4567",
            website: "https://techparts.com",
            logo_url: undefined, // No logo available
            rating: 4.8,
            total_orders: 1250,
            matching_score: 94,
            specialties: ["Electronics", "Computer Parts", "Semiconductors"],
            location: "Silicon Valley, CA"
          },
          {
            id: 2,
            company_name: "EcoMaterials Ltd",
            business_type: "Sustainable Materials",
            description: "Specialized supplier of eco-friendly materials and sustainable packaging solutions for environmentally conscious businesses.",
            address: "789 Green Avenue, Portland, OR",
            phone: "+1 (555) 456-7890",
            website: "https://ecomaterials.com",
            logo_url: undefined, // No logo available
            rating: 4.9,
            total_orders: 650,
            matching_score: 92,
            specialties: ["Sustainable Materials", "Eco Packaging", "Green Solutions"],
            location: "Portland, OR"
          },
          {
            id: 3,
            company_name: "Precision Tools Inc",
            business_type: "Tooling & Equipment",
            description: "High-precision tooling and equipment supplier serving aerospace, automotive, and medical device industries.",
            address: "321 Precision Drive, Austin, TX",
            phone: "+1 (555) 321-0987",
            website: "https://precisiontools.com",
            logo_url: undefined, // No logo available
            rating: 4.7,
            total_orders: 1100,
            matching_score: 89,
            specialties: ["Precision Tools", "Aerospace", "Medical Devices"],
            location: "Austin, TX"
          },
          {
            id: 4,
            company_name: "Global Manufacturing Co.",
            business_type: "Industrial Equipment",
            description: "Comprehensive supplier of industrial machinery, tools, and manufacturing equipment for various industries.",
            address: "456 Industrial Blvd, Detroit, MI",
            phone: "+1 (555) 987-6543",
            website: "https://globalmfg.com",
            logo_url: undefined, // No logo available
            rating: 4.6,
            total_orders: 890,
            matching_score: 87,
            specialties: ["Industrial Equipment", "Manufacturing Tools", "Heavy Machinery"],
            location: "Detroit, MI"
          },
          {
            id: 5,
            company_name: "Digital Solutions Corp",
            business_type: "Software & Technology",
            description: "Provider of enterprise software solutions, cloud services, and digital transformation consulting for modern businesses.",
            address: "555 Innovation Way, Seattle, WA",
            phone: "+1 (555) 234-5678",
            website: "https://digitalsolutions.com",
            logo_url: undefined, // No logo available
            rating: 4.5,
            total_orders: 750,
            matching_score: 85,
            specialties: ["Enterprise Software", "Cloud Services", "Digital Consulting"],
            location: "Seattle, WA"
          },
          {
            id: 6,
            company_name: "Textile Masters",
            business_type: "Fashion & Textiles",
            description: "Premium textile supplier specializing in sustainable fabrics, custom manufacturing, and fashion industry solutions.",
            address: "888 Fashion District, New York, NY",
            phone: "+1 (555) 345-6789",
            website: "https://textilemasters.com",
            logo_url: undefined, // No logo available
            rating: 4.4,
            total_orders: 1200,
            matching_score: 78,
            specialties: ["Sustainable Fabrics", "Custom Manufacturing", "Fashion Solutions"],
            location: "New York, NY"
          },
          {
            id: 7,
            company_name: "FoodTech Innovations",
            business_type: "Food & Beverage",
            description: "Innovative food processing equipment and packaging solutions for restaurants, cafes, and food service businesses.",
            address: "777 Culinary Blvd, Chicago, IL",
            phone: "+1 (555) 456-7890",
            website: "https://foodtech.com",
            logo_url: undefined, // No logo available
            rating: 4.3,
            total_orders: 950,
            matching_score: 76,
            specialties: ["Food Processing", "Packaging Solutions", "Restaurant Equipment"],
            location: "Chicago, IL"
          },
          {
            id: 8,
            company_name: "AutoParts Direct",
            business_type: "Automotive Parts",
            description: "Comprehensive automotive parts supplier serving repair shops, dealerships, and individual car enthusiasts nationwide.",
            address: "999 Motor City Ave, Detroit, MI",
            phone: "+1 (555) 567-8901",
            website: "https://autopartsdirect.com",
            logo_url: undefined, // No logo available
            rating: 4.2,
            total_orders: 1800,
            matching_score: 74,
            specialties: ["Auto Parts", "Repair Equipment", "Car Accessories"],
            location: "Detroit, MI"
          },
          {
            id: 9,
            company_name: "HealthTech Supplies",
            business_type: "Medical Equipment",
            description: "Medical equipment and healthcare supplies provider serving hospitals, clinics, and healthcare professionals.",
            address: "444 Medical Plaza, Boston, MA",
            phone: "+1 (555) 678-9012",
            website: "https://healthtechsupplies.com",
            logo_url: undefined, // No logo available
            rating: 4.6,
            total_orders: 600,
            matching_score: 72,
            specialties: ["Medical Equipment", "Healthcare Supplies", "Diagnostic Tools"],
            location: "Boston, MA"
          },
          {
            id: 10,
            company_name: "Construction Materials Plus",
            business_type: "Construction & Building",
            description: "Full-service construction materials supplier providing everything from basic building supplies to specialized equipment.",
            address: "333 Builder's Row, Phoenix, AZ",
            phone: "+1 (555) 789-0123",
            website: "https://constructionmaterials.com",
            logo_url: undefined, // No logo available
            rating: 4.1,
            total_orders: 1400,
            matching_score: 70,
            specialties: ["Building Materials", "Construction Equipment", "Safety Supplies"],
            location: "Phoenix, AZ"
          }
        ];
        
        // Sort suppliers by matching score (highest first)
        const sortedSuppliers = mockSuppliers.sort((a, b) => b.matching_score - a.matching_score);
        
        setSuppliers(sortedSuppliers);
      } catch (err: any) {
        setError("Failed to load suppliers. Please try again.");
        console.error("Error fetching suppliers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Please log in to access suppliers.</p>
          <Link href="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (user.role !== "buyer") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">This page is only available for buyers.</p>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getMatchingScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-yellow-500";
    if (score >= 70) return "bg-orange-500";
    return "bg-red-500";
  };

  const getMatchingScoreText = (score: number) => {
    if (score >= 90) return "Excellent Match";
    if (score >= 80) return "Good Match";
    if (score >= 70) return "Fair Match";
    return "Low Match";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
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
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse Suppliers</h2>
          <p className="text-gray-600">
            Discover suppliers matched to your business needs using AI-powered recommendations. Suppliers are ranked by matching score.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading suppliers...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map((supplier, index) => (
              <Card key={supplier.id} className="hover:shadow-lg transition-shadow relative">
                {/* Ranking Badge - Only for top 5 */}
                {index < 5 && (
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                    #{index + 1}
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        {supplier.logo_url ? (
                          <img 
                            src={supplier.logo_url} 
                            alt={`${supplier.company_name} logo`}
                            className="w-10 h-10 rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {supplier.company_name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                          </div>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{supplier.company_name}</CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                          {supplier.business_type}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      className={`${getMatchingScoreColor(supplier.matching_score)} text-white`}
                    >
                      {supplier.matching_score}%
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {supplier.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{supplier.rating}</span>
                      <span className="text-gray-500">({supplier.total_orders} orders)</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {getMatchingScoreText(supplier.matching_score)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{supplier.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{supplier.phone}</span>
                    </div>
                    {supplier.website && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4" />
                        <a 
                          href={supplier.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Specialties:</div>
                    <div className="flex flex-wrap gap-1">
                      {supplier.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button className="flex-1" size="sm">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && !error && suppliers.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
          </div>
        )}
      </main>
    </div>
  );
}
