// components/FilterBar.tsx
'use client';

import { Filter } from 'lucide-react';

// Definimos os tipos de filtros que nosso app suporta
export type ActiveFilters = {
  openNow: boolean;
};

// O componente recebe os filtros ativos e uma função para atualizá-los
interface FilterBarProps {
  filters: ActiveFilters;
  onFilterChange: (newFilters: ActiveFilters) => void;
}

const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  const handleOpenNowClick = () => {
    // Inverte o estado atual do filtro 'openNow'
    onFilterChange({ ...filters, openNow: !filters.openNow });
  };

  return (
    <div className="absolute top-[70px] left-1/2 z-10 w-[90vw] max-w-md -translate-x-1/2">
      <div className="flex items-center space-x-2">
        {/* Botão de Filtro "Abertos agora" */}
        <button
          onClick={handleOpenNowClick}
          // Estilo dinâmico: muda a cor se o filtro estiver ativo
          className={`flex items-center rounded-full px-3 py-1.5 text-sm font-semibold transition-colors
            ${filters.openNow
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-700 shadow-md hover:bg-gray-100'
            }`}
        >
          <Filter size={14} className="mr-1.5" />
          Abertos agora
        </button>

        {/* Outros botões de filtro podem ser adicionados aqui no futuro */}
      </div>
    </div>
  );
};

export default FilterBar;