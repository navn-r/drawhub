import axios from 'axios';
import { useQuery } from 'react-query';

const query = (canvasId: string) => {
  return async () => {
    const { data } = await axios.get('/api/canvas/' + canvasId);
    return data;
  };
};

/**
 * @see https://react-query-v3.tanstack.com/guides/query-keys#if-your-query-function-depends-on-a-variable-include-it-in-your-query-key
 */
export function useGetCanvas(canvasId: string) {
  return useQuery(['canvas', canvasId], query(canvasId), {
    refetchOnMount: true,
  });
}

export default useGetCanvas;
