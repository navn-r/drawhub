import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Server } from 'socket.io';

const accessTokenOptions = { audience: process.env['NX_AUTH0_AUDIENCE'] };

/**
 * @see https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#4-create-a-useapi-hook-for-accessing-protected-apis-with-an-access-token
 */
export const useApi = (method: 'GET' | 'POST', url: string, body?: string) => {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [refresh, setRefresh] = useState(0);
  const [state, setState] = useState({
    error: null as unknown,
    loading: true,
    data: null,
  });

  /**
   * `getAccessTokenSilently` is not allowed on the localhost domain;
   *  only used in local development as a fallback to silent token
   */
  const retryWithPopup = async () => {
    await getAccessTokenWithPopup(accessTokenOptions);
    setRefresh((refresh) => refresh + 1);
  };

  const server = new Server(3000);

  useEffect(() => {
    (async () => {
      try {
        console.log('in here');
        server.emit('events', { name: 'Nest' }, (data: unknown) => console.log(data));
        const accessToken = await getAccessTokenSilently(accessTokenOptions);
        const options: RequestInit = {
          method,
          body,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        };

        console.log(refresh, url, options);

        const data = await fetch(url, options).then((res) => res.json());

        setState({
          data,
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({
          error,
          data: null,
          loading: false,
        });
      }
    })();
  }, [getAccessTokenSilently, url, refresh, method, body]);

  return {
    ...state,
    retryWithPopup,
  };
};

export default useApi;
