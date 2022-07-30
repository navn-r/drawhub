import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const saveContributor = async (canvas: { _id: string; contributors: string[] }) => {
  const {
    data: {
      data: { saveContributor: data },
    },
  } = await axios.post('/api/graphql', {
    operationName: 'saveContributor',
    query: `
      mutation saveContributor($canvas: UpdateCanvasInput!) {
        saveContributor(payload: $canvas) {
          _id,
          contributors
        }
      }
    `,
    variables: {
      canvas,
    },
  });
  return data;
};

export function useSaveContributor() {
  const queryClient = useQueryClient();

  return useMutation(saveContributor, {
    onSuccess: () => {
      queryClient.invalidateQueries(['canvas']);
    },
  });
}

export default useSaveContributor;
