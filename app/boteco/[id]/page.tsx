'use client';

import { ChevronLeft, Plus, Clock, Star, AlertTriangle, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useRoute } from '../../../context/RouteContext';
import { getBotecoById } from '../../../data/botecos';
import { getCardapioByBotecoId } from '../../../data/cardapios';
import { useState, useEffect } from 'react';

export default function BotecoDetailsPage({ params }: { params: { id: string } }) {
  const { route, addBoteco } = useRoute();
  
  const botecoData = getBotecoById(params.id);
  const cardapioData = getCardapioByBotecoId(params.id);

  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const savedVote = localStorage.getItem(`vote_${params.id}`);
    if (savedVote) setHasVoted(true);
  }, [params.id]);

  const handleVote = (category: string, value: number) => {
    alert(`Você avaliou ${category} com nota ${value}! (Simulação)`);
    localStorage.setItem(`vote_${params.id}`, 'true');
    setHasVoted(true);
  };

  if (!botecoData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-center p-4">
        <AlertTriangle className="h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-2xl font-bold">Boteco não encontrado</h1>
        <p className="text-gray-600">O boteco que você procura não existe.</p>
        <Link href="/" className="mt-6 rounded-md bg-orange-500 px-4 py-2 font-semibold text-white">
          Voltar para o Mapa
        </Link>
      </div>
    );
  }

  const previewCategory = cardapioData?.categories[0];
  const handleAddClick = () => addBoteco({ id: botecoData.id, name: botecoData.name });
  const isAlreadyInRoute = route.some(b => b.id === botecoData.id);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="fixed top-0 z-20 flex w-full items-center bg-white p-4 shadow-sm">
        <Link href="/" className="mr-2 rounded-full p-2 hover:bg-gray-100">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="truncate text-lg font-semibold">{botecoData.name}</h1>
      </header>

      <main className="pt-16 pb-24">
        <div className="h-48 w-full bg-gray-200">
          <img src={botecoData.imageUrl} alt={`Fachada de ${botecoData.name}`} className="h-full w-full object-cover" />
        </div>

        <div className="p-4">
          <h2 className="text-3xl font-bold">{botecoData.name}</h2>
          <p className="mt-1 text-gray-600">{botecoData.address}</p>
          <div className="mt-3 flex items-center space-x-4 text-sm text-gray-800">
            <div className="flex items-center"><Star className="mr-1 h-4 w-4 text-yellow-500" /> <span className="font-bold">{botecoData.rating}</span> <span className="ml-1 text-gray-500">({botecoData.reviews} reviews)</span></div>
            <div className={`flex items-center ${botecoData.isOpen ? 'text-green-600' : 'text-red-600'}`}><Clock className="mr-1 h-4 w-4" /> <span className="font-bold">{botecoData.isOpen ? 'Aberto agora' : 'Fechado'}</span></div>
          </div>
        </div>

        {previewCategory && (
          <section className="px-4 mt-4 bg-white py-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">{previewCategory.title} em Destaque</h3>
            <div className="space-y-4">
              {previewCategory.items.slice(0, 3).map(item => (
                <div key={item.name} className="flex items-center"><img src={item.thumbnailUrl} alt={item.name} className="w-20 h-20 rounded-md object-cover mr-4" /><div className="flex-grow"><p className="font-bold text-gray-800">{item.name}</p><p className="text-sm text-gray-500 line-clamp-2">{item.description}</p></div><p className="font-semibold text-green-700 ml-4 whitespace-nowrap">{item.price}</p></div>
              ))}
            </div>
            <Link href={`/cardapio/${botecoData.id}`} className="mt-6 flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-3 font-bold text-white transition-colors hover:bg-black"><BookOpen className="mr-2" size={20} /> Ver Cardápio Completo</Link>
          </section>
        )}

        <section className="p-4 mt-4 border-t bg-white">
          <h3 className="text-xl font-semibold mb-4">Avalie sua Experiência (Simulação)</h3>
          {hasVoted ? (<p className="text-green-600 font-semibold">Obrigado pela sua avaliação!</p>) : (<div className="space-y-3">{['Atendimento', 'Comida', 'Ambiente'].map((category) => (<div key={category} className="flex justify-between items-center"><span className="font-medium">{category}:</span><div className="flex space-x-1">{[1, 2, 3, 4, 5].map(star => (<button key={star} onClick={() => handleVote(category, star)} className="text-2xl hover:scale-110 transition-transform">⭐</button>))}</div></div>))}</div>)}
        </section>
      </main>

      <footer className="fixed bottom-0 flex w-full items-center justify-between border-t border-gray-200 bg-white p-4 z-20">
        <div><p className="text-sm">Horário hoje:</p><p className="font-semibold">{botecoData.hours}</p></div>
        <button onClick={handleAddClick} disabled={isAlreadyInRoute} className="flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"><Plus className="mr-2 h-5 w-5" /> {isAlreadyInRoute ? 'Adicionado' : 'Adicionar à Rota'}</button>
      </footer>
    </div>
  );
}