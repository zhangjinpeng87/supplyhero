"use client";

import { Package, Truck, CreditCard, BarChart3, Zap, Globe } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Package,
      title: "Inventory Management",
      description: "Real-time inventory tracking with automated reorder points and demand forecasting."
    },
    {
      icon: Truck,
      title: "Logistics Tracking",
      description: "End-to-end shipment tracking with carrier integration and delivery notifications."
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Secure payment processing with automated invoicing and payment tracking."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Comprehensive analytics dashboard with performance metrics and insights."
    },
    {
      icon: Zap,
      title: "AI Recommendations",
      description: "Machine learning-powered supplier matching and demand prediction."
    },
    {
      icon: Globe,
      title: "Integration Hub",
      description: "Connect with ERP systems, Shopify, and other business applications."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Your Supply Chain
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and insights you need 
            to optimize your supply chain operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
