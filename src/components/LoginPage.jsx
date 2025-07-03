import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Pill } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Default users - in a real app, this would come from a database
  const defaultUsers = [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      role: 'Administrator',
      name: 'Admin User',
      permissions: ['all']
    },
    {
      id: 2,
      username: 'pharmacist1',
      password: 'pharma123',
      role: 'Pharmacist',
      name: 'Dr. Sarah Johnson',
      permissions: ['bills', 'sales', 'stock', 'orders']
    },
    {
      id: 3,
      username: 'pharmacist2',
      password: 'pharma123',
      role: 'Pharmacist',
      name: 'Dr. Michael Chen',
      permissions: ['bills', 'sales', 'stock', 'orders']
    },
    {
      id: 4,
      username: 'cashier1',
      password: 'cash123',
      role: 'Cashier',
      name: 'Emily Davis',
      permissions: ['bills', 'sales']
    },
    {
      id: 5,
      username: 'cashier2',
      password: 'cash123',
      role: 'Cashier',
      name: 'James Wilson',
      permissions: ['bills', 'sales']
    },
    {
      id: 6,
      username: 'manager',
      password: 'manager123',
      role: 'Manager',
      name: 'Robert Brown',
      permissions: ['bills', 'sales', 'stock', 'orders', 'users']
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = defaultUsers.find(
      u => u.username === formData.username && u.password === formData.password
    );

    if (user) {
      onLogin(user);
    } else {
      setError('Invalid username or password');
    }

    setLoading(false);
  };

  const handleDemoLogin = (username, password) => {
    setFormData({ username, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Pill className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PharmaBill Pro</h1>
          <p className="text-gray-600">Pharmacy Billing Management System</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Demo Accounts:</h3>
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleDemoLogin('admin', 'admin123')}
                  className="p-2 bg-purple-50 text-purple-700 rounded border hover:bg-purple-100 transition-colors"
                >
                  <div className="font-medium">Administrator</div>
                  <div>admin / admin123</div>
                </button>
                <button
                  onClick={() => handleDemoLogin('manager', 'manager123')}
                  className="p-2 bg-green-50 text-green-700 rounded border hover:bg-green-100 transition-colors"
                >
                  <div className="font-medium">Manager</div>
                  <div>manager / manager123</div>
                </button>
                <button
                  onClick={() => handleDemoLogin('pharmacist1', 'pharma123')}
                  className="p-2 bg-blue-50 text-blue-700 rounded border hover:bg-blue-100 transition-colors"
                >
                  <div className="font-medium">Pharmacist</div>
                  <div>pharmacist1 / pharma123</div>
                </button>
                <button
                  onClick={() => handleDemoLogin('cashier1', 'cash123')}
                  className="p-2 bg-orange-50 text-orange-700 rounded border hover:bg-orange-100 transition-colors"
                >
                  <div className="font-medium">Cashier</div>
                  <div>cashier1 / cash123</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;