// components/MapComponent.tsx
'use client';
import { useState, useMemo, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import { getAllBotecos, Boteco } from '../data/botecos';
import React from 'react';
import { ActiveFilters } from './FilterBar';

interface MapComponentProps {
  searchQuery?: string;
  botecosToShow?: Boteco[];
  children?: React.ReactNode;
  filters?: ActiveFilters;
}

const MapComponent = ({ searchQuery = '', botecosToShow, children, filters }: MapComponentProps) => {
  const [viewport, setViewport] = useState({
    latitude: -19.9245,
    longitude: -43.9352,
    zoom: 12,
  });
  const [selectedBoteco, setSelectedBoteco] = useState<Boteco | null>(null);

  const botecos = useMemo(() => {
    if (botecosToShow) return botecosToShow;

    let allBotecos = getAllBotecos();

    // Aplica os filtros de categoria
    if (filters) {
      if (filters.openNow) {
        allBotecos = allBotecos.filter(boteco => boteco.isOpen === true);
      }
    }

    // Aplica a busca por texto
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      allBotecos = allBotecos.filter((boteco) => {
        const nameMatch = boteco.name.toLowerCase().includes(lowerQuery);
        const addressMatch = boteco.address.toLowerCase().includes(lowerQuery);
        const tagMatch = boteco.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
        return nameMatch || addressMatch || tagMatch;
      });
    }
    
    return allBotecos;
  }, [searchQuery, botecosToShow, filters]);

  useEffect(() => {
    if (botecosToShow && botecosToShow.length > 0) {
      setViewport(v => ({
        ...v,
        latitude: botecosToShow[0].latitude,
        longitude: botecosToShow[0].longitude,
        zoom: 14,
      }));
    }
  }, [botecosToShow]);

  return (
    <div className="h-full w-full">
      <Map
        {...viewport}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ width: '100%', height: '100%' }}
      >
        {botecos.map((boteco) => (
          <Marker
            key={boteco.id}
            latitude={boteco.latitude}
            longitude={boteco.longitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedBoteco(boteco);
            }}
          >
             <div className="cursor-pointer transform hover:scale-110 transition-transform">
              <MapPin className="text-red-500" size={32} />
            </div>
          </Marker>
        ))}
        {selectedBoteco && (
          <Popup
            anchor="top"
            longitude={selectedBoteco.longitude}
            latitude={selectedBoteco.latitude}
            onClose={() => setSelectedBoteco(null)}
            closeOnClick={false}
          >
            <div>
              <h3 className="font-bold">{selectedBoteco.name}</h3>
              <div className="flex items-center text-sm">
                <Star className="mr-1 h-4 w-4 text-yellow-500" />
                <span>{selectedBoteco.rating} ({selectedBoteco.reviews} reviews)</span>
              </div>
              <Link href={`/boteco/${selectedBoteco.id}`} className="mt-2 inline-block text-sm text-orange-600 hover:underline">
                Ver Detalhes →
              </Link>
            </div>
          </Popup>
        )}
        {children}
      </Map>
    </div>
  );
};

export default MapComponent;