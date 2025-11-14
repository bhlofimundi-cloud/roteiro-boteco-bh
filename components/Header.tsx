'use client';

import Link from 'next/link';
import { Map, Beer } from 'lucide-react';
import { useRoute } from '../context/RouteContext';

export default function Header() {
  const { route } = useRoute();
  const itemCount = route.length;

  return (
    <header className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-md z-20 shrink-0">
      <Link href="/" className="flex items-center gap-2">
        <Beer className="h-8 w-8 text-orange-500" />
        <span className="text-xl font-bold text-gray-800">Roteiro do Boteco</span>
      </Link>
      <Link href="/rota" className="relative rounded-full p-3 hover:bg-gray-100 transition-colors">
        <Map className="h-6 w-6 text-gray-700" />
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {itemCount}
          </span>
        )}
      </Link>
    </header>
  );
}