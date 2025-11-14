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
    // CORREÇÃO: Esta verificação é segura para ser executada no servidor durante o build.
    // Ela garante que o objeto 'navigator' só será acessado se estivermos em um ambiente de navegador.
    if (typeof window !== 'undefined' && 'share' in navigator) {
      setIsSupported(true);
    }
  }, []);

  const handleShare = async () => {
    // A verificação 'isSupported' já garante que navigator.share existe.
    if (!isSupported) {
      alert("A função de compartilhar não é suportada neste navegador.");
      return;
    }
    
    try {
      await navigator.share({
        title: title,
        text: text,
        url: url,
      });
    } catch (error) {
      // O erro 'AbortError' acontece se o usuário fechar a janela de compartilhamento. Não precisa ser logado.
      if ((error as Error).name !== 'AbortError') {
        console.error('Erro ao compartilhar', error);
      }
    }
  };

  // Se a API não for suportada, o componente não renderiza nada.
  // Isso evita que o botão apareça em navegadores de desktop que não têm a função.
  if (!isSupported) {
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