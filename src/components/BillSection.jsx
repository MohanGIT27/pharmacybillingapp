import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Calendar, User, Phone, MapPin } from 'lucide-react';

const BillSection = () => {
  const [bills, setBills] = useState([
    {
      id: 'BILL001',
      customerName: 'Mohan',
      customerPhone: '+1 234-567-8900',
      customerAddress: '123 Main St, City',
      date: '2024-01-15',
      items: [
        { name: 'Paracetamol 500mg', quantity: 2, price: 5.99, total: 11.98 },
        { name: 'Vitamin C Tablets', quantity: 1, price: 12.50, total: 12.50 }
      ],
      subtotal: 24.48,
      tax: 2.45,
      total: 26.93,
      status: 'Paid'
    },
    {
      id: 'BILL002',
      customerName: 'Madhu',
      customerPhone: '+1 234-567-8901',
      customerAddress: '456 Oak Ave, City',
      date: '2024-01-14',
      items: [
        { name: 'Cough Syrup', quantity: 1, price: 8.75, total: 8.75 },
        { name: 'Bandages', quantity: 3, price: 3.25, total: 9.75 }
      ],
      subtotal: 18.50,
      tax: 1.85,
      total: 20.35,
      status: 'Pending'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewBillForm, setShowNewBillForm] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const filteredBills = bills.filter(bill =>
    bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
  };

  const handleDeleteBill = (billId) => {
    setBills(bills.filter(bill => bill.id !== billId));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Bills Management</h1>
          <button
            onClick={() => setShowNewBillForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            New Bill
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search bills by customer name or bill ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Bills Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bill ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {bill.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bill.customerName}</div>
                        <div className="text-sm text-gray-500">{bill.customerPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(bill.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${bill.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        bill.status === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {bill.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewBill(bill)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="View Bill"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Edit Bill"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteBill(bill.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Delete Bill"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bill Details Modal */}
        {selectedBill && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Bill Details</h2>
                <button
                  onClick={() => setSelectedBill(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {/* Bill Header */}
                <div className="border-b pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Bill ID</p>
                      <p className="font-semibold">{selectedBill.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold">{new Date(selectedBill.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <User size={16} className="mr-2" />
                    Customer Information
                  </h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Name:</span> {selectedBill.customerName}</p>
                    <p className="flex items-center">
                      <Phone size={14} className="mr-2 text-gray-600" />
                      {selectedBill.customerPhone}
                    </p>
                    <p className="flex items-center">
                      <MapPin size={14} className="mr-2 text-gray-600" />
                      {selectedBill.customerAddress}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">Items</h3>
                  <div className="space-y-2">
                    {selectedBill.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity} × ${item.price}</p>
                        </div>
                        <p className="font-semibold">${item.total.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${selectedBill.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${selectedBill.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>${selectedBill.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    onClick={() => setSelectedBill(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Print Bill
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Bill Form Modal */}
        {showNewBillForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Create New Bill</h2>
                <button
                  onClick={() => setShowNewBillForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="text-center py-8 text-gray-500">
                <p>New bill form will be implemented here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillSection;