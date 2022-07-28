import { useAuth0 } from '@auth0/auth0-react';
import { Progress } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Home libs only require querying
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnReconnect: false,
    },
  },
});

export interface ApiProviderProps {
  children: React.ReactNode;
}

/**
 * Wrapper 'provider' to init axios interceptor
 */
export function ApiProvider({ children }: ApiProviderProps) {
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let interceptor: number;

    (async () => {
      /**
       * The action of adding the interceptor to the request stack
       * is async, so you cannot be certain that a request will be
       * intercepted or not by the time the its dispatched
       *
       * SO SOMETIMES IT WORKS AND SOMETIMES IT DOESN'T!
       */
      interceptor = axios.interceptors.request.use(
        async (config) => {
          if (config) {
            const accessToken = await getAccessTokenSilently({
              audience: process.env['NX_AUTH0_AUDIENCE'],
            });

            if (accessToken) {
              config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
              };
            }
          }

          return config;
        },
        (error) => Promise.reject(error)
      );

      // This is so janky, but it works locally ;)
      // If this doesn't work, bump the timeout in production
      await new Promise((res) => setTimeout(res, 1000));
      setLoading(false);
    })();

    // eject interceptor on unMount
    return () => {
      if (interceptor !== null || interceptor !== undefined) {
        axios.interceptors.request.eject(interceptor);
      }
    };
  }, [getAccessTokenSilently]);

  return (
    <QueryClientProvider client={queryClient}>
      {loading ? <Progress size="xs" isIndeterminate /> : children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default ApiProvider;
