import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HotelList } from './components/HotelList';
import * as API from './services/api/endpoints';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };
useEffect(() => {
  if (window.location.pathname === '/') {
    navigateTo('/hotels');
  }

  const handleLocationChange = () => setCurrentPath(window.location.pathname);
  window.addEventListener('popstate', handleLocationChange);
  return () => window.removeEventListener('popstate', handleLocationChange);
}, []);
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Header />
      
      <div style={{ maxWidth: '1024px', margin: '10px auto', padding: '0 20px', textAlign: 'right' }}>
        <button onClick={() => navigateTo('/hotels')} style={btnStyle}>Home</button>
        <button onClick={() => navigateTo('/signin')} style={btnStyle}>Sign In</button>
      </div>

      <main style={{ padding: '20px', maxWidth: '1024px', margin: '0 auto' }}>
        {currentPath === '/signin' ? (
          <div style={cardStyle}>
            <h2>Sign In</h2>
            <p>Will connect to: {API.signInEndpoint}</p>
            {/* Implement your Auth logic here */}
          </div>
        ) : (
          <>
            <h2 style={{ marginBottom: '20px' }}>Trending Destinations</h2>
            <HotelList />
          </>
        )}
      </main>
    </div>
  );
}

const btnStyle = {
  background: '#003580',
  color: 'white',
  border: 'none',
  padding: '8px 15px',
  marginLeft: '10px',
  cursor: 'pointer',
  borderRadius: '4px'
};

const cardStyle = {
  background: 'white',
  padding: '40px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

export default App;