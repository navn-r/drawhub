import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const accessTokenOptions = { audience: process.env['NX_AUTH0_AUDIENCE'] };

/**
 * @see https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#4-create-a-useapi-hook-for-accessing-protected-apis-with-an-access-token
 */
export const useApi = (url: string) => {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [refresh, setRefresh] = useState(0);
  const [state, setState] = useState({
    error: null as unknown,
    loading: true,
    data: null,
  });

  /**
   * `getAccessTokenSilently` is not allowed on the localhost domain;
   *  only used in local development as a fallback to slient token
   */
  const retryWithPopup = async () => {
    await getAccessTokenWithPopup(accessTokenOptions);
    setRefresh((refresh) => refresh + 1);
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently(accessTokenOptions);

        const data = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((res) => res.json());

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
  }, [getAccessTokenSilently, url, refresh]);

  return {
    ...state,
    retryWithPopup,
  };
};

export default useApi;
