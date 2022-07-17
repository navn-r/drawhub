import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const createCanvas = async (canvas: { name: string }) => {
  const { data } = await axios.post('/api/canvas', canvas);
  return data;
};

export function useCreateCanvas() {
  const queryClient = useQueryClient();

  return useMutation(createCanvas, {
    onSuccess: () => {
      queryClient.invalidateQueries(['canvas']);
    },
  });
}

export default useCreateCanvas;
