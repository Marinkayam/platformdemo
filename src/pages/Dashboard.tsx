
import React from "react";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-gray-500 text-sm font-medium mb-2">Total Invoices</h2>
          <div className="text-3xl font-bold">256</div>
          <div className="mt-2 text-sm text-green-600">↑ 12% from last month</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-gray-500 text-sm font-medium mb-2">Pending Invoices</h2>
          <div className="text-3xl font-bold">64</div>
          <div className="mt-2 text-sm text-red-600">↑ 18% from last month</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-gray-500 text-sm font-medium mb-2">Total Revenue</h2>
          <div className="text-3xl font-bold">$1,245,803.12</div>
          <div className="mt-2 text-sm text-green-600">↑ 8% from last month</div>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">JD</div>
            <div className="ml-4">
              <div className="text-sm font-medium">John Doe approved invoice INV-100121298</div>
              <div className="text-xs text-gray-500">Today at 10:30 AM</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">AS</div>
            <div className="ml-4">
              <div className="text-sm font-medium">Alice Smith paid invoice INV-100121211</div>
              <div className="text-xs text-gray-500">Yesterday at 4:45 PM</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">RJ</div>
            <div className="ml-4">
              <div className="text-sm font-medium">Robert Johnson created invoice INV-100123322</div>
              <div className="text-xs text-gray-500">Yesterday at 1:30 PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
