import '@radix-ui/themes/styles.css';
import {
   isRouteErrorResponse,
   Links,
   Meta,
   Outlet,
   Scripts,
   ScrollRestoration,
} from 'react-router';
import type { FC, PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { Theme } from '@radix-ui/themes';

import './styles/app.css';
import type { Route } from './+types/root';
import { store } from './store';
import { toastConfig } from './config/toast-config';
import { themeConfig } from './config/theme-config';

export const links: Route.LinksFunction = () => [
   {
      rel: 'icon',
      href: '/icon.png',
   },
   { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
   {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
   },
   {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
   },
];

export const meta: Route.MetaFunction = () => [
   { title: 'Media gallery' },
   {
      name: 'description',
      content: 'Simple media gallery that allows media files management',
   },
];

export const Layout: FC<PropsWithChildren> = ({ children }) => {
   return (
      <html lang="en">
         <head>
            <meta charSet="utf-8" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <Meta />
            <Links />
         </head>
         <body>
            {children}
            <ScrollRestoration />
            <Scripts />
         </body>
      </html>
   );
};

const App: FC = () => {
   return (
      <Theme {...themeConfig}>
         <Toaster {...toastConfig} />
         {/*{import.meta.env.DEV && <ThemePanel />}*/}
         <Provider store={store}>
            <Outlet />
         </Provider>
      </Theme>
   );
};

export default App;

export const ErrorBoundary: FC<Route.ErrorBoundaryProps> = ({ error }) => {
   let message = 'Oops!';
   let details = 'An unexpected error occurred.';
   let stack: string | undefined;

   if (isRouteErrorResponse(error)) {
      message = error.status === 404 ? '404' : 'Error';
      details =
         error.status === 404
            ? 'The requested page could not be found.'
            : error.statusText || details;
   } else if (import.meta.env.DEV && error && error instanceof Error) {
      details = error.message;
      stack = error.stack;
   }

   return (
      <main className="pt-16 p-4 container mx-auto">
         <h1>{message}</h1>
         <p>{details}</p>
         {stack && (
            <pre className="w-full p-4 overflow-x-auto">
               <code>{stack}</code>
            </pre>
         )}
      </main>
   );
};
