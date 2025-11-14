'use client';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar por nome, bairro ou especialidade..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full rounded-full border-gray-300 bg-white p-3 pl-10 text-sm shadow-md focus:border-orange-500 focus:ring-orange-500"
      />
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    </div>
  );
}