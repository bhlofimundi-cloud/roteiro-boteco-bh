// app/page.tsx
'use client';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SuggestionsPanel from '../components/SuggestionsPanel';
import { useMemo, useState } from 'react';
import FilterBar, { ActiveFilters } from '../components/FilterBar';

// IMPORTANTE: Definimos o componente dinâmico FORA do componente Home,
// mas SEM usar o hook useMemo. O 'dynamic' já otimiza isso.
const DynamicMap = dynamic(
  () => import('../components/MapComponent'),
  {
    ssr: false,
    loading: () => <p className="flex h-full w-full items-center justify-center bg-gray-300">Carregando mapa...</p>
  }
);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ActiveFilters>({
    openNow: false,
  });

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <Header />
      <main className="relative flex-grow">
        <DynamicMap searchQuery={searchQuery} filters={filters} />
        <SearchBar onSearch={setSearchQuery} />
        <FilterBar filters={filters} onFilterChange={setFilters} />
        <SuggestionsPanel />
      </main>
    </div>
  );
}