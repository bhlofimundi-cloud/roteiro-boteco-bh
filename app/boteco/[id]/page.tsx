// app/boteco/[id]/page.tsx
'use client';
import { ChevronLeft, Plus, Clock, Star, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useRoute } from '../../../context/RouteContext'; // Importe nosso hook customizado
import { getBotecoById } from '../../../data/botecos';

// O Next.js passa 'params' como uma prop para a página
export default function BotecoDetailsPage({ params }: { params: { id: string } }) {
  // Use o hook para obter o contexto
  const { route, addBoteco } = useRoute();

  // Busque os dados do boteco usando o 'id' da URL
  const botecoData = getBotecoById(params.id);

  // Lide com o caso em que o boteco não é encontrado
  if (!botecoData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <AlertTriangle className="h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-2xl font-bold">Boteco não encontrado</h1>
        <p className="text-gray-600">O boteco que você está procurando não existe.</p>
        <Link href="/" className="mt-6 rounded-md bg-orange-500 px-4 py-2 text-white">
          Voltar para o Mapa
        </Link>
      </div>
    );
  }

  const handleAddClick = () => {
    addBoteco({ id: botecoData.id, name: botecoData.name });
  };
  
  const isAlreadyInRoute = route.some(b => b.id === botecoData.id);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="fixed top-0 z-10 flex w-full items-center bg-white p-4 shadow-sm">
        <Link href="/" className="mr-2 rounded-full p-2 hover:bg-gray-100">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="truncate text-lg font-semibold">{botecoData.name}</h1>
      </header>

      <main className="pt-20 pb-24">
        <div className="h-48 w-full bg-gray-200">
          <img
            src={botecoData.imageUrl}
            alt={`Foto de ${botecoData.name}`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-4">
          <h2 className="text-3xl font-bold">{botecoData.name}</h2>
          <p className="mt-1 text-gray-600">{botecoData.address}</p>
          <div className="mt-3 flex items-center space-x-4 text-sm text-gray-800">
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 text-yellow-500" />
              <span className="font-bold">{botecoData.rating}</span>
              <span className="ml-1 text-gray-500">({botecoData.reviews} reviews)</span>
            </div>
            <div className={`flex items-center ${botecoData.isOpen ? 'text-green-600' : 'text-red-600'}`}>
              <Clock className="mr-1 h-4 w-4" />
              <span className="font-bold">{botecoData.isOpen ? 'Aberto agora' : 'Fechado'}</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 flex w-full items-center justify-between border-t border-gray-200 bg-white p-4">
        <div>
          <p className="text-sm">Horário hoje:</p>
          <p className="font-semibold">{botecoData.hours}</p>
        </div>
        <button 
          onClick={handleAddClick}
          disabled={isAlreadyInRoute}
          className="flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Plus className="mr-2 h-5 w-5" />
          {isAlreadyInRoute ? 'Adicionado' : 'Rota'}
        </button>
      </footer>
    </div>
  );
}