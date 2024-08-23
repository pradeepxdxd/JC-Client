import React, { useEffect, useState } from 'react';
import Layout from './layouts/Layout';
import Loading from './views/Loading/Loading';
import Auth from './pages/Auth/Auth';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

export default function App() {
  const [view, setView] = useState('loading'); // Track view state
  const [opacity, setOpacity] = useState(1); // Track opacity for fade effect

  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    setView('loading');
    const fadeOutTimeout = setTimeout(() => {
      setOpacity(0); // Start fading out
    }, 5500);

    return () => {
      clearTimeout(fadeOutTimeout);
    };
  }, []);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        setView('layout');
        setOpacity(1);
      }, 6000);
    }
    else {
      setTimeout(() => {
        setView('auth');
        setOpacity(1);
      }, 6000);
    }
  }, [token])

  return (
    <>
      <ToastContainer />
      <div style={{ transition: 'opacity 0.5s ease', opacity: opacity }}>
        {/* {view === 'loading' ? <Loading /> : <Layout />} */}
        {view === 'loading' ? <Loading /> : view === 'auth' ? <Auth /> : <Layout />}
      </div>
    </>
  );
}
