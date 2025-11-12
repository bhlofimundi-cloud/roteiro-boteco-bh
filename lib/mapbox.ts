// lib/mapbox.ts
import { Boteco } from "@/data/botecos";

// Esta função formata as coordenadas para a URL da API
const formatCoordinates = (botecos: Boteco[]) => {
  return botecos.map(b => `${b.longitude},${b.latitude}`).join(';');
};

// Esta é a função principal que chama a API de Direções do Mapbox
export const getDirections = async (botecos: Boteco[]) => {
  if (botecos.length < 2) {
    return null; // Não podemos buscar uma rota com menos de 2 pontos
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
    // A API retorna a geometria da primeira rota encontrada
    return data.routes[0].geometry;
  } catch (error) {
    console.error("Erro de rede ao buscar direções:", error);
    return null;
  }
};