import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useQuery } from 'react-query';

const query = async () => {
  const { data } = await axios.get('/api/protected');
  return data;
};

export function useGetProtectedData() {
  const { getAccessTokenWithPopup } = useAuth0();
  const result = useQuery(['app', 'protected'], query);

  // Just example, should only keep audience value in api-provider
  const retryWithPopup = async () => {
    await getAccessTokenWithPopup({ audience: process.env['NX_AUTH0_AUDIENCE'] });
    result.refetch();
  };

  return {
    ...result,
    retryWithPopup,
  };
}

export default useGetProtectedData;
