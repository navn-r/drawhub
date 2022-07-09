import { ChakraProvider } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { AppState, Auth0Provider } from '@auth0/auth0-react';

import App from './app/app';

/**
 * @see https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#1-protecting-a-route-in-a-react-router-dom-v6-app
 */
const Auth0ProviderWithRedirectCallback: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState): void => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  return (
    <Auth0Provider
      onRedirectCallback={onRedirectCallback}
      domain={process.env['NX_AUTH0_DOMAIN'] ?? ''}
      clientId={process.env['NX_AUTH0_CLIENT_ID'] ?? ''}
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Auth0ProviderWithRedirectCallback>
          <App />
        </Auth0ProviderWithRedirectCallback>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
