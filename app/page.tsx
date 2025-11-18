// app/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FloatingFilters from '../components/FloatingFilters';
// ▼▼▼ IMPORTS CORRIGIDOS ▼▼▼
import { MainFilterType, ActiveFilters } from '@/types'; // Apontando para o novo arquivo

type UserLocation = { latitude: number; longitude: number; };

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mainFilter, setMainFilter] = useState<MainFilterType>('all');
  const [filters, setFilters] = useState<ActiveFilters>({ openNow: false, nearby: false, bomPraDate: false, torresmo: false });
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const DynamicMap = useMemo(() => dynamic(() => import('../components/MapComponent'), { ssr: false }), []);

  // Erros de 'any' implícito corrigidos adicionando o tipo ao parâmetro 'prev'
  const handleMainFilterClick = (filter: MainFilterType) => {
    setMainFilter((prev: MainFilterType) => (prev === filter ? 'all' : filter));
  };
  
  const handleSecondaryFilterClick = (filter: keyof ActiveFilters) => {
    if (filter === 'nearby' && !filters.nearby) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
          setFilters((prev: ActiveFilters) => ({ ...prev, nearby: true }));
          setLoadingLocation(false);
        },
        () => {
          alert("Não foi possível obter sua localização.");
          setLoadingLocation(false);
        }
      );
    } else {
      setFilters((prev: ActiveFilters) => ({ ...prev, [filter]: !prev[filter] }));
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <Header />
      <main className="relative flex-grow">
        <DynamicMap 
          searchQuery={searchQuery} 
          filters={filters} 
          userLocation={userLocation} 
          mainFilter={mainFilter} 
        />
        
        <div className="absolute top-4 left-1/2 z-10 w-11/12 max-w-lg -translate-x-1/2">
            <SearchBar onSearch={setSearchQuery} />
        </div>
        
        <FloatingFilters 
          mainFilter={mainFilter}
          activeFilters={filters}
          isLoadingLocation={loadingLocation}
          onMainFilterClick={handleMainFilterClick}
          onSecondaryFilterClick={handleSecondaryFilterClick}
        />
      </main>
    </div>
  );
}// Final version for deploy.