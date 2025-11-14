// components/SuggestionsPanel.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useRoute } from '../context/RouteContext';
import { getSuggestedRoutes } from '../data/botecos';

const SuggestionsPanel = () => {
  const { setRoute } = useRoute();
  const router = useRouter();
  
  const suggestedRoutes = getSuggestedRoutes();

  type BotecoRoute = { id: string; name: string; };

  const handleSuggestionClick = (botecos: BotecoRoute[]) => {
    setRoute(botecos);
    router.push('/rota');
  };

  return (
    <div className="absolute bottom-4 left-1/2 z-10 w-[90vw] max-w-md -translate-x-1/2">
      <div className="rounded-lg bg-white p-4 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold">Rotas em Destaque</h2>
        <div className="space-y-2">
          {suggestedRoutes.map((route) => (
            // CORREÇÃO: Verificamos se 'route.botecos' existe E se tem itens.
            route.botecos && route.botecos.length > 0 && (
              <div
                key={route.name}
                onClick={() => handleSuggestionClick(route.botecos)}
                className="flex cursor-pointer items-center justify-between rounded-md bg-gray-50 p-2 hover:bg-gray-100"
              >
                <div>
                  <p className="font-medium">{route.name}</p>
                  <p className="text-sm text-gray-500">{route.botecos.length} paradas</p>
                </div>
                <button className="rounded-full bg-orange-500 px-3 py-1 text-sm font-semibold text-white hover:bg-orange-600">
                  Ver Rota
                </button>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPanel;