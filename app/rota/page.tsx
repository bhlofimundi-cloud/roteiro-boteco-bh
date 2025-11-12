// app/rota/page.tsx
'use client';
import { useRoute } from '../../context/RouteContext';
import Link from 'next/link';
import { ChevronLeft, X, GripVertical } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useMemo, useState, useEffect } from 'react';
import { getDirections } from '../../lib/mapbox';
import { Source, Layer } from 'react-map-gl';
import { Boteco, getBotecoById } from '../../data/botecos';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

type RouteGeometry = { type: 'LineString'; coordinates: number[][]; };

export default function RotaPage() {
  const { route: routeIds, removeBoteco, reorderRoute } = useRoute();
  
  const routeBotecos: Boteco[] = useMemo(() => 
    routeIds.map(r => getBotecoById(r.id)).filter((b): b is Boteco => b !== undefined),
    [routeIds]
  );
  
  const [routeGeometry, setRouteGeometry] = useState<RouteGeometry | null>(null);

  useEffect(() => {
    setRouteGeometry(null);
    if (routeBotecos.length > 1) {
      getDirections(routeBotecos).then(geometry => {
        if (geometry) {
          setRouteGeometry(geometry);
        }
      });
    }
  }, [routeBotecos]);

  const Map = useMemo(() => dynamic(
    () => import('../../components/MapComponent'),
    { ssr: false, loading: () => <p>Carregando mapa...</p> }
  ), []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderRoute(result.source.index, result.destination.index);
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 w-full items-center bg-white px-4 shadow-md z-10 shrink-0">
        <Link href="/" className="mr-2 rounded-full p-2 hover:bg-gray-100">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">Minha Rota</h1>
      </header>
      <div className="flex flex-grow flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-1/3 p-4 overflow-y-auto border-r">
          <h2 className="text-lg font-semibold mb-2">Paradas ({routeBotecos.length})</h2>
          {routeBotecos.length === 0 ? (
            <p>Sua rota está vazia.</p>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="botecos">
                {(provided) => (
                  <ol ref={provided.innerRef} {...provided.droppableProps} className="list-inside space-y-2">
                    {routeBotecos.map((boteco, index) => (
                      <Draggable key={boteco.id} draggableId={boteco.id} index={index}>
                        {(provided, snapshot) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border-b pb-2 flex justify-between items-center group bg-white p-2 rounded-md ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                          >
                            <div className="flex items-center">
                              <div {...provided.dragHandleProps} className="p-1 text-gray-400 cursor-grab">
                                <GripVertical size={18} />
                              </div>
                              <div className="ml-2">
                                <p className="font-bold">{index + 1}. {boteco.name}</p>
                                <p className="text-sm text-gray-600">{boteco.address}</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => removeBoteco(boteco.id)} 
                              className="p-1 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-opacity"
                              aria-label={`Remover ${boteco.name}`}
                            >
                              <X size={18} />
                            </button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ol>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </aside>
        <main className="w-full md:w-2/3 h-64 md:h-auto">
          <Map botecosToShow={routeBotecos}>
            {routeGeometry && (
              <Source id="route" type="geojson" data={routeGeometry}>
                <Layer
                  id="route-layer"
                  type="line"
                  paint={{ 'line-color': '#3b82f6', 'line-width': 5 }}
                  layout={{ 'line-join': 'round', 'line-cap': 'round' }}
                />
              </Source>
            )}
          </Map>
        </main>
      </div>
    </div>
  );
}