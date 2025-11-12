// app/cardapio/[botecoId]/layout.tsx
import { getThemeByBotecoId } from '../../../data/cardapios';

export default function CardapioLayout({ children, params }: { children: React.ReactNode, params: { botecoId: string } }) {
  const theme = getThemeByBotecoId(params.botecoId);

  const style = theme ? { backgroundImage: `url(${theme.backgroundUrl})` } : {};

  return (
    <div className="bg-cover bg-center bg-fixed min-h-screen" style={style}>
      <div className="bg-black bg-opacity-50 min-h-screen">
        {children}
      </div>
    </div>
  );
}