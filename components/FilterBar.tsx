'use client';
import { Sun, MapPin, Heart, Flame, Loader } from 'lucide-react';

export type ActiveFilters = {
  openNow: boolean;
  nearby: boolean;
  bomPraDate: boolean;
  torresmo: boolean;
};

interface FilterBarProps {
  filters: ActiveFilters;
  onFilterChange: (newFilters: ActiveFilters) => void;
  isLoadingLocation: boolean;
}

const filterButtons = [
    { key: 'openNow', icon: Sun, label: 'Abertos agora' },
    { key: 'nearby', icon: MapPin, label: 'Perto de mim' },
    { key: 'bomPraDate', icon: Heart, label: 'Bom pra Date' },
    { key: 'torresmo', icon: Flame, label: 'Torresmo de Responsa' },
] as const;


export default function FilterBar({ filters, onFilterChange, isLoadingLocation }: FilterBarProps) {
    const handleToggleFilter = (filterKey: keyof ActiveFilters) => {
        const newFilters = { ...filters, [filterKey]: !filters[filterKey] };
        onFilterChange(newFilters);
    };

    return (
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
            {filterButtons.map(btn => {
                const isActive = filters[btn.key];
                const Icon = btn.icon;
                const isLoading = btn.key === 'nearby' && isLoadingLocation;

                return (
                    <button
                        key={btn.key}
                        onClick={() => handleToggleFilter(btn.key)}
                        disabled={isLoading}
                        className={`
                            flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ease-in-out
                            transform hover:scale-105 disabled:opacity-70 disabled:cursor-wait
                            ${isActive
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-800 shadow-md hover:bg-gray-100'
                            }
                        `}
                    >
                        {isLoading ? <Loader size={16} className="animate-spin" /> : <Icon size={16} />}
                        <span className="ml-2">{btn.label}</span>
                    </button>
                )
            })}
        </div>
    );
}