// lib/mapbox.ts
import { Boteco } from "../data/botecos";

// --- FUNÇÕES PARA A API DE DIREÇÕES ---

const formatCoordinates = (botecos: Boteco[]) => {
  return botecos.map(b => `${b.longitude},${b.latitude}`).join(';');
};

export interface MapboxRoute {
  geometry: {
    type: 'LineString';
    coordinates: number[][];
  };
  distance: number;
  duration: number;
}

export const getDirections = async (botecos: Boteco[]): Promise<MapboxRoute | null> => {
  if (botecos.length < 2) {
    return null;
  }

  const coordinates = formatCoordinates(botecos);
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&overview=full&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Erro ao buscar direções:", await response.json());
      return null;
    }
    const data = await response.json();
    return data.routes[0]; 
  } catch (error) {
    console.error("Erro de rede ao buscar direções:", error);
    return null;
  }
};


// --- FUNÇÃO UTILITÁRIA PARA CÁLCULO DE DISTÂNCIA ---

/**
 * Calcula a distância em quilômetros entre dois pontos geográficos usando a fórmula de Haversine.
 * @param lat1 Latitude do ponto 1
 * @param lon1 Longitude do ponto 1
 * @param lat2 Latitude do ponto 2
 * @param lon2 Longitude do ponto 2
 * @returns A distância em KM.
 */
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distância em km
};