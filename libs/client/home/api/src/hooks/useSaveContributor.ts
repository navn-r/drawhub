import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const addContributor = async (info: { canvasId: string; email: string }) => {
  const { data } = await axios.post(`/api/canvas/${info.canvasId}/${info.email}/contributor`);
  return data;
};

export function useSaveContributor() {
  const queryClient = useQueryClient();

  return useMutation(addContributor, {
    onSuccess: () => {
      queryClient.invalidateQueries(['canvas']);
    },
  });
}

export default useSaveContributor;
