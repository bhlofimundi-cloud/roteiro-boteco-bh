import './globals.css';
import { RouteProvider } from '../context/RouteContext';

export const metadata = {
  title: 'Roteiro do Boteco BH',
  description: 'Descubra, crie rotas e explore os melhores botecos de Belo Horizonte.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <RouteProvider>
          {children}
        </RouteProvider>
      </body>
    </html>
  );
}