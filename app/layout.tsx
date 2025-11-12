// app/layout.tsx
import './globals.css'
import { Providers } from './providers'; // Importe o novo componente

export const metadata = {
  title: 'Rotas Botecos BH',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        {/* Use o componente Providers aqui */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}