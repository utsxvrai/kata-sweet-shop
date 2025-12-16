import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-cream">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes with Layout */}
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

// Protected Layout Component
function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon mx-auto"></div>
          <p className="mt-4 text-maroon">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {/* Navbar */}
      <nav className="bg-maroon text-cream shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="text-gold">Kata</span> Sweet Shop
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Home />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-maroon text-cream py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-cream/90">
            Authentic Indian Sweets Since 1995
          </p>
        </div>
      </footer>
    </>
  );
}

// Logout Button Component
function LogoutButton() {
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gold hover:bg-saffron text-white font-medium py-2 px-4 rounded-lg transition-colors"
    >
      Logout
    </button>
  );
}

export default App;

