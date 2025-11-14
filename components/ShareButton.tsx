// components/ShareButton.tsx
'use client';
import { Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

const ShareButton = ({ title, text, url }: ShareButtonProps) => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Verifica se o navegador suporta a API de Compartilhamento
    if (navigator.share) {
      setIsSupported(true);
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (error) {
        console.error('Erro ao compartilhar', error);
      }
    }
  };

  if (!isSupported) {
    // Se a API não for suportada, não renderiza nada
    return null;
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center rounded-full bg-gray-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black"
      aria-label="Compartilhar"
    >
      <Share2 size={16} className="mr-2" />
      Compartilhar
    </button>
  );
};

export default ShareButton;