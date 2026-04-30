import { useState, useEffect } from 'react';
import { AuthProvider } from './common/stores/useStoreAuth';
import { HotelsProvider } from './common/stores/useStoreHotels';
import { BookingsProvider } from './common/stores/useStoreBookings';
import { ToastProvider } from './components/ui/Toast/Toast';
import { Navbar } from './components/layout/Navbar/Navbar';
import { Footer } from './components/layout/Footer/Footer';
import { HomeScreen } from './screens/HomeScreen/HomeScreen';
import { HotelDetailScreen } from './screens/HotelDetailScreen/HotelDetailScreen';
import { LoginScreen } from './screens/LoginScreen/LoginScreen';
import { AdminDashboard } from './screens/AdminDashboard/AdminDashboard';

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Simple route matching
  const renderRoute = () => {
    if (currentPath === '/login') {
      return <LoginScreen onNavigate={navigateTo} />;
    }

    if (currentPath === '/admin') {
      return <AdminDashboard onNavigate={navigateTo} />;
    }

    // Match /hotel/:id
    const hotelMatch = currentPath.match(/^\/hotel\/(.+)$/);
    if (hotelMatch) {
      return (
        <HotelDetailScreen hotelId={hotelMatch[1]} onNavigate={navigateTo} />
      );
    }

    // Default: Home
    return <HomeScreen onNavigate={navigateTo} />;
  };

  const showNavbar = currentPath !== '/login';
  const showFooter = currentPath !== '/login';

  return (
    <>
      {showNavbar && <Navbar currentPath={currentPath} onNavigate={navigateTo} />}
      <main style={{ flex: 1 }}>{renderRoute()}</main>
      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <HotelsProvider>
        <BookingsProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </BookingsProvider>
      </HotelsProvider>
    </AuthProvider>
  );
}

export default App;