// components/SearchBar.tsx
'use client';

import { Search } from 'lucide-react';

// Definimos o que este componente espera receber
interface SearchBarProps {
  onSearch: (query: string) => void; // Uma função que recebe o texto
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  
  // Função chamada cada vez que o usuário digita
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    onSearch(text); // Envia o texto para o pai imediatamente
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Opcional: focar no mapa ou fechar teclado mobile
  };

  return (
    <div className="absolute top-4 left-1/2 z-10 w-[90vw] max-w-md -translate-x-1/2">
      <form
        onSubmit={handleSubmit}
        className="flex items-center overflow-hidden rounded-full bg-white shadow-lg"
      >
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="Buscar boteco por nome, bairro ou tag..."
          className="w-full px-5 py-3 text-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 text-gray-500 hover:text-orange-500"
        >
          <Search size={22} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;