'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type RouteItem = {
  id: string;
  name: string;
};

interface RouteContextType {
  route: RouteItem[];
  addBoteco: (boteco: RouteItem) => void;
  removeBoteco: (botecoId: string) => void;
  reorderRoute: (startIndex: number, endIndex: number) => void;
  clearRoute: () => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export function RouteProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<RouteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedRoute = localStorage.getItem('boteco_route');
      if (storedRoute) {
        setRoute(JSON.parse(storedRoute));
      }
    } catch (error) {
      console.error("Erro ao carregar rota do localStorage:", error);
      setRoute([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('boteco_route', JSON.stringify(route));
    }
  }, [route, isLoaded]);

  const addBoteco = (boteco: RouteItem) => {
    if (!route.some(item => item.id === boteco.id)) {
      setRoute(prevRoute => [...prevRoute, boteco]);
    }
  };

  const removeBoteco = (botecoId: string) => {
    setRoute(prevRoute => prevRoute.filter(item => item.id !== botecoId));
  };

  const reorderRoute = (startIndex: number, endIndex: number) => {
    setRoute(prevRoute => {
      const result = Array.from(prevRoute);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };
  
  const clearRoute = () => {
    setRoute([]);
  };

  return (
    <RouteContext.Provider value={{ route, addBoteco, removeBoteco, reorderRoute, clearRoute }}>
      {children}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error('useRoute must be used within a RouteProvider');
  }
  return context;
}