import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import FarmerDashboard from './pages/FarmerDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import { LayoutDashboard } from 'lucide-react';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dashboardPath, setDashboardPath] = useState('/login');

  useEffect(() => {
    try {
      const cur = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (cur) {
        if (cur.type === 'farmer') {
          setDashboardPath('/farmer-dashboard');
          return;
        }
        if (cur.type === 'company') {
          setDashboardPath('/company-dashboard');
          return;
        }
      }
      const admin = JSON.parse(localStorage.getItem('adminUser') || 'null');
      if (admin && admin.type === 'admin') {
        setDashboardPath('/admin');
        return;
      }
    } catch (e) {
      console.error(e);
    }
    setDashboardPath('/login');
  }, [location]);

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Floating Admin Trigger */}
      <Link to="/admin-login" style={{
        position: 'fixed', bottom: '82px', right: '24px', zIndex: 9999,
        width: '46px', height: '46px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
        boxShadow: '0 8px 24px rgba(15,23,42,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', border: '2px solid white', cursor: 'pointer',
        transition: 'all 0.2s ease', textDecoration: 'none'
      }}
      title="Admin Portal"
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(15,23,42,0.45)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.3)'; }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
      </Link>

      {/* Floating Dashboard Trigger */}
      <Link to={dashboardPath} style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
        width: '46px', height: '46px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #10b981, #059669)',
        boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', border: '2px solid white', cursor: 'pointer',
        transition: 'all 0.2s ease', textDecoration: 'none'
      }}
      title="Go to Dashboard"
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(16,185,129,0.45)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(16,185,129,0.3)'; }}
      >
        <LayoutDashboard size={18} />
      </Link>
      
      <footer className="bg-secondary text-white py-12 mt-20 border-t border-white/10">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">KrishiConnect</h3>
            <p className="opacity-70">Empowering farmers and streamlining bulk agricultural trade since 2024.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3 opacity-70">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li><a href="/about" className="hover:text-primary">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="flex flex-col gap-3 opacity-70">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact Us</h4>
            <p className="opacity-70 mb-4">Email: vidyasirimane@gmail.com</p>
            <p className="opacity-70">Phone: +91 91874 83151</p>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-white/10 text-center opacity-50 text-sm">
          © 2024 Krishi Connect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
