import React, { useState } from 'react';
import { TrendingUp, Calendar, DollarSign, ShoppingCart, Filter, Download, Eye } from 'lucide-react';

const SalesSection = () => {
  const [dateRange, setDateRange] = useState('today');
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  // Sample sales data
  const salesData = [
    {
      id: 'SALE001',
      date: '2024-01-15',
      time: '10:30 AM',
      customer: 'Mohan',
      items: 3,
      amount: 26.93,
      paymentMethod: 'Cash',
      cashier: 'Madhu'
    },
    {
      id: 'SALE002',
      date: '2024-01-15',
      time: '11:15 AM',
      customer: 'Rohit Nadan',
      items: 2,
      amount: 20.35,
      paymentMethod: 'Card',
      cashier: 'Suresh'
    },
    {
      id: 'SALE003',
      date: '2024-01-15',
      time: '02:45 PM',
      customer: 'Teja',
      items: 5,
      amount: 45.80,
      paymentMethod: 'Cash',
      cashier: 'Suresh'
    },
    {
      id: 'SALE004',
      date: '2024-01-14',
      time: '09:20 AM',
      customer: 'Lalitha',
      items: 1,
      amount: 15.50,
      paymentMethod: 'Card',
      cashier: 'Madhu'
    }
  ];

  const salesSummary = {
    totalSales: salesData.reduce((sum, sale) => sum + sale.amount, 0),
    totalTransactions: salesData.length,
    averageTransaction: salesData.reduce((sum, sale) => sum + sale.amount, 0) / salesData.length,
    cashSales: salesData.filter(sale => sale.paymentMethod === 'Cash').reduce((sum, sale) => sum + sale.amount, 0),
    cardSales: salesData.filter(sale => sale.paymentMethod === 'Card').reduce((sum, sale) => sum + sale.amount, 0)
  };

  const topProducts = [
    { name: 'Paracetamol 500mg', quantity: 25, revenue: 149.75 },
    { name: 'Vitamin C Tablets', quantity: 18, revenue: 225.00 },
    { name: 'Cough Syrup', quantity: 12, revenue: 105.00 },
    { name: 'Bandages', quantity: 15, revenue: 48.75 },
    { name: 'Antiseptic Cream', quantity: 8, revenue: 64.00 }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Sales Analytics</h1>
            <p className="text-gray-600">Track and analyze your pharmacy sales performance</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Download size={20} />
              Export Report
            </button>
          </div>
        </div>

        {/* Sales Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">₹{salesSummary.totalSales.toFixed(2)}</p>
                <p className="text-sm text-green-600">+12% from yesterday</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{salesSummary.totalTransactions}</p>
                <p className="text-sm text-green-600">+8% from yesterday</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Transaction</p>
                <p className="text-2xl font-bold text-gray-900">₹{salesSummary.averageTransaction.toFixed(2)}</p>
                <p className="text-sm text-green-600">+3% from yesterday</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cash vs Card</p>
                <p className="text-lg font-bold text-gray-900">
                  ₹{salesSummary.cashSales.toFixed(2)} / ₹{salesSummary.cardSales.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">Cash / Card</p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Sales */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Recent Sales</h2>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded">
                    <Filter size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sale ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sale.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{sale.customer}</div>
                        <div className="text-sm text-gray-500">by {sale.cashier}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.items} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{sale.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          sale.paymentMethod === 'Cash' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {sale.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Top Products</h2>
              <p className="text-sm text-gray-600">Best selling items today</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.quantity} sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">₹{product.revenue.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sales Chart Placeholder */}
        <div className="mt-6 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Sales Trend</h2>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <TrendingUp size={48} className="mx-auto mb-2 text-gray-400" />
              <p>Sales chart will be displayed here</p>
              <p className="text-sm">Integration with charting library needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesSection;