// components/FloatingFilters.tsx
'use client';

import Image from 'next/image';
import { Sun, MapPin, Heart, Flame, Loader } from 'lucide-react';
import { MainFilterType } from './MainFilters';
import { ActiveFilters } from './FilterBar';

interface FloatingFiltersProps {
  mainFilter: MainFilterType;
  activeFilters: ActiveFilters;
  isLoadingLocation: boolean;
  onMainFilterClick: (filter: MainFilterType) => void;
  onSecondaryFilterClick: (filter: keyof ActiveFilters) => void;
}

const mainFilterDefs = [
  { id: 'botecar', label: 'Festival Botecar', icon: <Image src="/images/botecar-marker.png" layout="fill" objectFit="contain" alt="Botecar" /> },
  { id: 'comida-di-buteco', label: 'Comida di Buteco', icon: <Image src="/logo-comida-di-buteco.png" layout="fill" objectFit="contain" alt="CdB" /> },
];

const secondaryFilterDefs = [
    { id: 'openNow', label: 'Abertos', icon: <Sun size={20} /> },
    { id: 'nearby', label: 'Perto de Mim', icon: <MapPin size={20} /> },
    { id: 'bomPraDate', label: 'Date', icon: <Heart size={20} /> },
    { id: 'torresmo', label: 'Torresmo', icon: <Flame size={20} /> },
] as const;

export default function FloatingFilters({ 
  mainFilter, 
  activeFilters, 
  isLoadingLocation,
  onMainFilterClick, 
  onSecondaryFilterClick 
}: FloatingFiltersProps) {

  const FilterButton = ({ label, icon, isActive, onClick, disabled = false }: any) => (
    <button onClick={onClick} disabled={disabled} className={`flex flex-col items-center justify-center p-2 h-20 w-full rounded-xl shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${isActive ? 'bg-primary text-white' : 'bg-white/80 backdrop-blur-md text-gray-700'} disabled:opacity-50 disabled:cursor-wait`}>
      <div className="relative w-8 h-8 mb-1">{icon}</div>
      <span className="text-xs font-semibold text-center">{label}</span>
    </button>
  );

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-sm">
      <div className="grid grid-cols-3 gap-3">
        {mainFilterDefs.map(f => (<FilterButton key={f.id} label={f.label} icon={f.icon} isActive={mainFilter === f.id} onClick={() => onMainFilterClick(f.id as MainFilterType)} />))}
        {secondaryFilterDefs.map(f => (<FilterButton key={f.id} label={f.label} icon={isLoadingLocation && f.id === 'nearby' ? <Loader className="animate-spin" size={20}/> : f.icon} isActive={activeFilters[f.id]} onClick={() => onSecondaryFilterClick(f.id)} disabled={isLoadingLocation && f.id === 'nearby'} />))}
      </div>
    </div>
  );
}