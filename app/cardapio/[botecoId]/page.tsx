// app/cardapio/[botecoId]/page.tsx
'use client';
import { useState } from 'react';
import { getBotecoById } from '../../../data/botecos';
import { getCardapioByBotecoId, getThemeByBotecoId } from '../../../data/cardapios';
import { notFound } from 'next/navigation';
import { X } from 'lucide-react';

export default function CardapioPage({ params }: { params: { botecoId: string } }) {
  const [activeTab, setActiveTab] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const boteco = getBotecoById(params.botecoId);
  const cardapio = getCardapioByBotecoId(params.botecoId);
  const theme = getThemeByBotecoId(params.botecoId);

  if (!boteco || !cardapio || !theme) notFound();

  const tabs = ['Capa', ...cardapio.categories.map(c => c.title), 'Contato']; // Renomeado para 'Contato'

  const handleItemClick = (itemVideoUrl?: string) => {
    if (itemVideoUrl) setVideoUrl(itemVideoUrl);
  };

  return (
    <div className="container mx-auto p-4 text-white">
      {/* Modal do Vídeo */}
      {videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center" onClick={() => setVideoUrl(null)}>
          <video src={videoUrl} controls autoPlay loop className="max-w-full max-h-full" />
          <button className="absolute top-4 right-4 text-white"><X size={32} /></button>
        </div>
      )}

      {/* Abas de Navegação */}
      <div className="flex justify-center space-x-2 md:space-x-4 mb-8 border-b border-gray-500 pb-2">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm md:text-base font-semibold transition-colors ${activeTab === index ? 'border-b-2 border-orange-500 text-white' : 'text-gray-300 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conteúdo das Abas */}
      <div className="text-center">
        {/* Capa */}
        {activeTab === 0 && (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <img src={theme.logoUrl} alt={`Logo ${boteco.name}`} className="max-w-xs md:max-w-sm mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold">{boteco.name}</h1>
          </div>
        )}

        {/* Páginas de Categorias (Tira-gostos, Bebidas) */}
        {cardapio.categories.map((category, index) =>
          activeTab === index + 1 && (
            <section key={category.title}>
              <h2 className="text-3xl font-bold mb-6">{category.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {category.items.map(item => (
                  <div key={item.name} onClick={() => handleItemClick(item.videoUrl)} className={`bg-black bg-opacity-40 rounded-lg overflow-hidden shadow-lg ${item.videoUrl ? 'cursor-pointer transform hover:scale-105 transition-transform' : ''}`}>
                    <img src={item.thumbnailUrl} alt={item.name} className="w-full h-32 object-cover" />
                    <div className="p-3 text-left">
                      <h3 className="font-bold text-base md:text-lg">{item.name}</h3>
                      <p className="text-gray-300 text-xs md:text-sm mt-1 h-10">{item.description}</p>
                      <p className="font-semibold text-green-400 mt-2 text-sm md:text-base">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        )}

        {/* Contracapa / Contato (Refinada) */}
        {activeTab === tabs.length - 1 && (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <img src={theme.logoUrl} alt={`Logo ${boteco.name}`} className="max-w-[200px] mb-8" />
            <p className="text-lg mb-8 max-w-md">{boteco.address}</p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <a 
                href="tel:3125352537"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                Ligar (31) 2535-2537
              </a>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(boteco.address)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                Ver no Google Maps
              </a>
              <a 
                href={`https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(boteco.address)}&dropoff[latitude]=${boteco.latitude}&dropoff[longitude]=${boteco.longitude}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                Chamar Uber
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}