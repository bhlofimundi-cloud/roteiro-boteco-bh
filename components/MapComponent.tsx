// components/MapComponent.tsx
'use client';
import { useState, useMemo, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Crown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBotecos, Boteco } from '../data/botecos';
import { ActiveFilters } from './FilterBar';
import { MainFilterType } from './MainFilters';
import { calculateDistance } from '../lib/mapbox';

interface MapComponentProps {
  searchQuery?: string;
  botecosToShow?: Boteco[];
  children?: React.ReactNode;
  filters: ActiveFilters;
  userLocation: { latitude: number; longitude: number; } | null;
  mainFilter: MainFilterType;
}

export default function MapComponent({
  searchQuery = '',
  botecosToShow,
  children,
  filters = { openNow: false, nearby: false, bomPraDate: false, torresmo: false },
  userLocation,
  mainFilter,
}: MapComponentProps) {
  const [viewport, setViewport] = useState({ latitude: -19.9245, longitude: -43.9352, zoom: 12 });
  const [selectedBoteco, setSelectedBoteco] = useState<Boteco | null>(null);

  const botecos = useMemo(() => {
    if (botecosToShow) return botecosToShow;
    let allBotecos = getAllBotecos();
    if (mainFilter !== 'all') {
      const tagMap = { 'botecar': 'botecar-2024', 'comida-di-buteco': 'comida-di-buteco', 'tropeirao': 'tropeirao' };
      const filterTag = tagMap[mainFilter as keyof typeof tagMap];
      if (filterTag) {
        allBotecos = allBotecos.filter(b => b.tags.includes(filterTag));
      }
    }
    let filtered = allBotecos;
    if (filters.openNow) filtered = filtered.filter(b => b.isOpen);
    if (filters.bomPraDate) filtered = filtered.filter(b => b.tags.includes('bom-pra-date'));
    if (filters.torresmo) filtered = filtered.filter(b => b.tags.includes('torresmo-de-responsa'));
    if (filters.nearby && userLocation) {
        filtered = filtered.map(boteco => ({ ...boteco, distance: calculateDistance(userLocation.latitude, userLocation.longitude, boteco.latitude, boteco.longitude) })).sort((a, b) => a.distance - b.distance).slice(0, 10);
    }
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(b => b.name.toLowerCase().includes(lowerQuery) || b.address.toLowerCase().includes(lowerQuery));
    }
    return filtered.sort((a, b) => (b.isPartner ? 1 : 0) - (a.isPartner ? 1 : 0));
  }, [searchQuery, botecosToShow, filters, userLocation, mainFilter]);
  
  useEffect(() => {
    if (filters.nearby && userLocation) {
        setViewport(v => ({ ...v, latitude: userLocation.latitude, longitude: userLocation.longitude, zoom: 14 }));
    }
  }, [filters.nearby, userLocation]);

  return (
    <div className="h-full w-full">
      <Map 
        {...viewport} 
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} 
        onMove={evt => setViewport(evt.viewState)} 
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: '100%', height: '100%' }} 
        onClick={() => setSelectedBoteco(null)}
      >
        {botecos.map(boteco => (
          <Marker key={boteco.id} latitude={boteco.latitude} longitude={boteco.longitude} anchor="bottom" onClick={e => { e.originalEvent.stopPropagation(); setSelectedBoteco(boteco); }}>
            <div 
              className={`cursor-pointer relative transition-transform duration-300 ease-out ${selectedBoteco?.id === boteco.id ? 'scale-125 z-20' : 'hover:scale-110 hover:z-10'}`}>
              <Image 
                src={boteco.isHighlight ? "/images/botecar-marker.png" : "/images/beer-pin.png"} 
                alt={boteco.name} 
                width={boteco.isHighlight ? 48 : 36} 
                height={boteco.isHighlight ? 48 : 36} 
                style={{ filter: boteco.isPartner ? 'drop-shadow(0 0 5px #facc15)' : 'drop-shadow(0 2px 3px rgba(0,0,0,0.4))' }} 
              />
              {boteco.isPartner && <div className="absolute -top-2 -left-2 text-yellow-400"><Crown size={18} fill="#facc15" /></div>}
            </div>
          </Marker>
        ))}
        {selectedBoteco && (
          <Popup anchor="top" longitude={selectedBoteco.longitude} latitude={selectedBoteco.latitude} onClose={() => setSelectedBoteco(null)} closeOnClick={false} offset={40}>
            <div className="w-48 rounded-lg">
                <Image src={selectedBoteco.imageUrl} alt={selectedBoteco.name} width={200} height={100} className="w-full h-20 object-cover rounded-t-lg" />
                <div className="p-2">
                    <h3 className="font-bold text-md mb-1">{selectedBoteco.name}</h3>
                    <p className="text-xs text-gray-600 truncate">{selectedBoteco.specialty}</p>
                    <Link href={`/boteco/${selectedBoteco.id}`} className="block w-full text-center bg-primary text-white text-sm font-semibold rounded-md p-2 mt-2 hover:bg-primary-dark transition-colors">
                        Ver Detalhes
                    </Link>
                </div>
            </div>
          </Popup>
        )}
        {children}
      </Map>
    </div>
  );
}