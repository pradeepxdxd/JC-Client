import React, { useEffect, useState } from 'react';
import Layout from './layouts/Layout';
import Loading from './views/Loading/Loading';

export default function App() {
  const [view, setView] = useState('loading'); // Track view state
  const [opacity, setOpacity] = useState(1); // Track opacity for fade effect

  useEffect(() => {
    setView('loading');
    const fadeOutTimeout = setTimeout(() => {
      setOpacity(0); // Start fading out
    }, 5500);

    const viewChangeTimeout = setTimeout(() => {
      setView('layout'); // Change to Layout view
      setOpacity(1); // Reset opacity for new view
    }, 6000);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(viewChangeTimeout);
    };
  }, []);

  return (
    <div style={{ transition: 'opacity 0.5s ease', opacity: opacity }}>
      {view === 'loading' ? <Loading /> : <Layout />}
    </div>
  );
}
