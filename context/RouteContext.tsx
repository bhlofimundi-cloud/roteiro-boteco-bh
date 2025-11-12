// context/RouteContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interface para a estrutura básica de um boteco na rota
interface Boteco {
  id: string;
  name: string;
}

// Interface que define tudo que nosso contexto fornecerá
interface RouteContextType {
  route: Boteco[];
  addBoteco: (boteco: Boteco) => void;
  setRoute: (newRoute: Boteco[]) => void;
  removeBoteco: (botecoId: string) => void;
  reorderRoute: (startIndex: number, endIndex: number) => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const [route, setRoute] = useState<Boteco[]>([]);

  const addBoteco = (boteco: Boteco) => {
    if (!route.some(b => b.id === boteco.id)) {
      setRoute(prevRoute => [...prevRoute, boteco]);
      alert(`${boteco.name} adicionado à rota!`);
    } else {
      alert(`${boteco.name} já está na sua rota.`);
    }
  };
  
  const handleSetRoute = (newRoute: Boteco[]) => {
    setRoute(newRoute);
  };

  const removeBoteco = (botecoId: string) => {
    setRoute(prevRoute => prevRoute.filter(boteco => boteco.id !== botecoId));
  };
  
  const reorderRoute = (startIndex: number, endIndex: number) => {
    setRoute(currentRoute => {
      const result = Array.from(currentRoute);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  return (
    <RouteContext.Provider value={{ route, addBoteco, setRoute: handleSetRoute, removeBoteco, reorderRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

// Hook customizado para usar o contexto facilmente
export const useRoute = () => {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error('useRoute deve ser usado dentro de um RouteProvider');
  }
  return context;
};