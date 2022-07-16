import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const deleteCanvas = async (canvasId: string) => {
  const { data } = await axios.delete('/api/canvas/' + canvasId);
  return data;
};

export function useDeleteCanvas() {
  const queryClient = useQueryClient();

  return useMutation(deleteCanvas, {
    onSuccess: () => {
      queryClient.invalidateQueries(['canvas']);
    },
  });
}

export default useDeleteCanvas;
