import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import BillSection from './components/BillSection';
import SalesSection from './components/SalesSection';
import StockSection from './components/StockSection';
import OrderSection from './components/OrderSection';
import UserManagement from './components/UserManagement';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActiveSection('dashboard');
    localStorage.removeItem('currentUser');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />;
      case 'bills':
        return <BillSection currentUser={currentUser} />;
      case 'sales':
        return <SalesSection currentUser={currentUser} />;
      case 'stock':
        return <StockSection currentUser={currentUser} />;
      case 'orders':
        return <OrderSection currentUser={currentUser} />;
      case 'users':
        return <UserManagement currentUser={currentUser} />;
      default:
        return <Dashboard currentUser={currentUser} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Navigation 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderSection()}
      </div>
    </div>
  );
}

export default App;