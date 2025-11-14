// components/BotecoList.tsx
import { Boteco } from "@/data/botecos";
import { Star } from "lucide-react";

interface BotecoListProps {
  botecos: Boteco[];
}

export default function BotecoList({ botecos }: BotecoListProps) {
  if (botecos.length === 0) {
    return <p className="p-4 text-center text-gray-500">Nenhum boteco encontrado. Tente ajustar seus filtros.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {botecos.map(boteco => (
        <li key={boteco.id} className="p-4 hover:bg-gray-50 cursor-pointer">
          <h3 className="font-bold text-gray-800">{boteco.name}</h3>
          <p className="text-sm text-gray-600 truncate">{boteco.address}</p>
          <div className="flex items-center mt-1 text-xs">
            <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-semibold">{boteco.rating}</span>
            <span className="text-gray-400 ml-1">({boteco.reviews} reviews)</span>
          </div>
        </li>
      ))}
    </ul>
  );
}