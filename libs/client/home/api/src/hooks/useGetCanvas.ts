import axios from 'axios';
import { useQuery } from 'react-query';

const query = (canvasId: string) => {
  return async () => {
    const { data } = await axios.get('/api/canvas/' + canvasId + '/image');
    return data;
  };
};

export function useGetCanvas(canvasId: string) {
  return useQuery(['canvas'], query(canvasId), {
    refetchOnMount: true,
  });
}

export default useGetCanvas;
