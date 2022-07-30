import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

// const addContributor = async (info: { canvasId: string; email: string }) => {
//   const { data } = await axios.post(`/api/canvas/${info.canvasId}/${info.email}/contributor`);
//   return data;
// };

const addContributor = async (canvas: { _id: string; contributors: string[] }) => {
  const {
    data: {
      data: { addContributor: data },
    },
  } = await axios.post('/api/graphql', {
    operationName: 'addContributor',
    query: `
      mutation addContributor($canvas: UpdateCanvasInput!) {
        addContributor(payload: $canvas) {
          _id,
          contributors
        }
      }
    `,
    variables: {
      canvas,
    },
  });
  console.log(data);
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
