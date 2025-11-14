// app/rota/page.tsx
'use client';

import { useRoute } from '../../context/RouteContext';
import Link from 'next/link';
import { ChevronLeft, X, GripVertical } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useMemo, useState, useEffect } from 'react';
import { getDirections, MapboxRoute } from '../../lib/mapbox';
import { Source, Layer } from 'react-map-gl';
import { Boteco, getBotecoById } from '../../data/botecos';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import NavigationActions from '../../components/NavigationActions';

export default function RotaPage() {
  const { route: routeIds, removeBoteco, reorderRoute } = useRoute();
  
  const routeBotecos: Boteco[] = useMemo(() => 
    routeIds.map(r => getBotecoById(r.id)).filter((b): b is Boteco => b !== undefined),
    [routeIds]
  );
  
  const [routeData, setRouteData] = useState<MapboxRoute | null>(null);

  useEffect(() => {
    setRouteData(null);
    if (routeBotecos.length > 1) {
      getDirections(routeBotecos).then(route => {
        if (route) setRouteData(route);
      });
    }
  }, [routeBotecos]);

  const Map = useMemo(() => dynamic(
    () => import('../../components/MapComponent'),
    { ssr: false, loading: () => <div className="flex h-full w-full items-center justify-center bg-gray-200"><p>Carregando mapa...</p></div> }
  ), []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderRoute(result.source.index, result.destination.index);
  };

  const formatDistance = (d: number) => `${(d / 1000).toFixed(1)} km`;
  const formatDuration = (d: number) => `${Math.floor(d / 60)} min`;

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 w-full items-center bg-white px-4 shadow-md z-10 shrink-0">
        <Link href="/" className="mr-2 rounded-full p-2 hover:bg-gray-100"><ChevronLeft size={24} /></Link>
        <h1 className="text-xl font-bold">Minha Rota</h1>
      </header>
      <div className="flex flex-grow flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-1/3 p-4 overflow-y-auto border-r bg-gray-50">
          {routeData && (
            <div className="mb-4 rounded-lg bg-white p-3 shadow"><h3 className="font-bold text-gray-800">Resumo da Rota</h3><div className="mt-2 flex justify-around text-center"><div><p className="text-sm text-gray-600">Distância</p><p className="text-lg font-semibold">{formatDistance(routeData.distance)}</p></div><div><p className="text-sm text-gray-600">Tempo de Carro</p><p className="text-lg font-semibold">{formatDuration(routeData.duration)}</p></div></div></div>
          )}
          <h2 className="text-xl font-bold mb-4 text-gray-800">Paradas ({routeBotecos.length})</h2>
          {routeBotecos.length > 0 && (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="botecos">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                    {routeBotecos.map((boteco, index) => (
                      <Draggable key={boteco.id} draggableId={boteco.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} className={`bg-white rounded-lg shadow-md flex flex-col p-2`}>
                            <div className="flex items-center">
                              <div {...provided.dragHandleProps} className="p-2 text-gray-400 cursor-grab"><GripVertical size={20} /></div>
                              <img src={boteco.imageUrl} alt={boteco.name} className="w-16 h-16 rounded-md object-cover" />
                              <div className="ml-4 flex-grow overflow-hidden"><p className="font-bold text-gray-800 truncate">{index + 1}. {boteco.name}</p><p className="text-sm text-gray-600 truncate">{boteco.address}</p></div>
                              <button onClick={() => removeBoteco(boteco.id)} className="p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-500 ml-2"><X size={18} /></button>
                            </div>
                            <NavigationActions boteco={boteco} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </aside>
        <main className="w-full md:w-2/3 h-64 md:h-auto">
          {/* ▼▼▼ CORREÇÃO APLICADA AQUI ▼▼▼ */}
          <Map 
            botecosToShow={routeBotecos}
            // Adiciona as props que faltavam com valores padrão/nulos
            filters={{ openNow: false, nearby: false, bomPraDate: false, torresmo: false }}
            userLocation={null}
            mainFilter={'all'}
          >
            {routeData && (
              <Source id="route" type="geojson" data={routeData.geometry}>
                  <Layer id="route-layer" type="line" paint={{ 'line-color': '#F97316', 'line-width': 5, 'line-opacity': 0.8 }} />
              </Source>
            )}
          </Map>
          {/* ▲▲▲ FIM DA CORREÇÃO ▲▲▲ */}
        </main>
      </div>
    </div>
  );
}