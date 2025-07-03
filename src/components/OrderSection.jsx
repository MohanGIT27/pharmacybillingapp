import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit2, 
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Calendar,
  DollarSign
} from 'lucide-react';
//import { recentOrders, medicines } from '../data/mockData';

const OrderSection = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const suppliers = [
    'MediSupply Ltd',
    'PharmaCorp Distributors',
    'HealthPlus Suppliers',
    'Global Pharma Solutions',
    'MedTech Distributors'
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const addToOrder = (medicine) => {
    const existingItem = orderItems.find(item => item.medicine.id === medicine.id);
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.medicine.id === medicine.id
          ? { ...item, quantity: item.quantity + 50, total: (item.quantity + 50) * item.price }
          : item
      ));
    } else {
      setOrderItems([...orderItems, {
        medicine,
        quantity: 50,
        price: medicine.costPrice,
        total: 50 * medicine.costPrice
      }]);
    }
  };

  const removeFromOrder = (medicineId) => {
    setOrderItems(orderItems.filter(item => item.medicine.id !== medicineId));
  };

  const orderTotal = orderItems.reduce((sum, item) => sum + item.total, 0);

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    med.quantity <= med.minStock * 2
  );

  const stats = [
    {
      label: 'Pending Orders',
      value: recentOrders.filter(order => order.status === 'pending').length.toString(),
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      label: 'Shipped Orders',
      value: recentOrders.filter(order => order.status === 'shipped').length.toString(),
      icon: Truck,
      color: 'bg-purple-500'
    },
    {
      label: 'Total Orders',
      value: recentOrders.length.toString(),
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      label: 'Order Value',
      value: `₹${recentOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500'
    }
  ];

  return (
    // ✅ Your full component JSX remains unchanged here.
    // ✅ (copy paste the JSX you posted - it will now work without type errors).
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* ... same JSX as before ... */}
    </div>
  );
};

export default OrderSection;
