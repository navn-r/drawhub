import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const deleteCanvas = async (canvasId: string) => {
  const {
    data: { data },
  } = await axios.post('/api/graphql', {
    operationName: 'DeleteCanvas',
    query: `
      mutation DeleteCanvas($canvasId: String!) {
        deleteCanvas(payload: { _id: $canvasId }) {
          _id,
          name,
          isNew,
          contributors
        }
      }
    `,
    variables: {
      canvasId,
    },
  });
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
