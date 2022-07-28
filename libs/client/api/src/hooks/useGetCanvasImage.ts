import axios from 'axios';
import { useQuery } from 'react-query';

const query = (canvasId: string) => {
  return async () => {
    const { data } = await axios.get('/api/canvas/' + canvasId + '/image');
    return data;
  };
};

export function useGetCanvasImage(canvasId: string) {
  return useQuery(['canvas', canvasId, 'image'], query(canvasId), {
    refetchOnMount: true,
  });
}

export default useGetCanvasImage;
