// components/Header.tsx
'use client';

import { Menu, User, MapPinned } from 'lucide-react';
import Link from 'next/link';
import { useRoute } from '../context/RouteContext';

// Usando export default function diretamente
export default function Header() {
  const { route } = useRoute();

  return (
    <header className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-md">
      <button className="rounded-full p-2 hover:bg-gray-100">
        <Menu size={24} />
      </button>
      <h1 className="text-xl font-bold text-gray-800">Rotas Botecos BH</h1>
      <Link href="/rota" className="relative rounded-full p-2 hover:bg-gray-100">
        <MapPinned size={24} />
        {route.length > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
            {route.length}
          </span>
        )}
      </Link>
    </header>
  );
}