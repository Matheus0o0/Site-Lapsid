"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MapInternal = dynamic(() => import('./MapInternal'), { ssr: false });

const MapView = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <p>Carregando mapa...</p>;

  return <MapInternal />;
};

export default MapView;
