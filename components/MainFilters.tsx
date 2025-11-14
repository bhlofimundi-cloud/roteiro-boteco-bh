// components/MainFilters.tsx
'use client';

export type MainFilterType = 'all' | 'tropeirao' | 'botecar' | 'comida-di-buteco';

interface MainFiltersProps {
  activeFilter: MainFilterType;
  onFilterChange: (filter: MainFilterType) => void;
}

const filters = [
  { id: 'botecar', label: 'Festival Botecar' },
  { id: 'comida-di-buteco', label: 'Comida di Buteco' },
  { id: 'tropeirao', label: 'Tropeirão' },
];

const MainFilters = ({ activeFilter, onFilterChange }: MainFiltersProps) => {
  
  const handleFilterClick = (filterId: MainFilterType) => {
    if (activeFilter === filterId) {
      onFilterChange('all');
    } else {
      onFilterChange(filterId);
    }
  };

  return (
    <div className="absolute top-4 left-1/2 z-20 w-[90vw] max-w-md -translate-x-1/2">
      <div className="flex items-center justify-center space-x-2 rounded-full bg-white/70 p-1 shadow-lg backdrop-blur-sm">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id as MainFilterType)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all
              ${activeFilter === filter.id
                ? 'bg-gray-800 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainFilters;