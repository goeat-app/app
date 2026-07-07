import { ReactNode } from 'react';

import { ScrollViewStyleReset } from 'expo-router/html';

const registerServiceWorkerScript = `
if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function (error) {
      console.error('Service worker registration failed', error);
    });
  });
}
`;

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#FDF6F5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GoEat" />
        <meta name="application-name" content="GoEat" />
        <meta name="msapplication-TileColor" content="#FDF6F5" />
        <meta
          name="description"
          content="Descubra restaurantes e personalize suas recomendacoes no GoEat."
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <ScrollViewStyleReset />
        <script
          dangerouslySetInnerHTML={{ __html: registerServiceWorkerScript }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
