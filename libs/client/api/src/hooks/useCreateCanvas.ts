import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const createCanvas = async (canvas: { name: string; isPublic: boolean }) => {
  const {
    data: {
      data: { createCanvas: data },
    },
  } = await axios.post('/api/graphql', {
    operationName: 'CreateCanvas',
    query: `
      mutation CreateCanvas($canvas: CreateCanvasInput!) {
        createCanvas(payload: $canvas) {
          _id,
          name,
          isNew,
          contributors,
          isPublic,
        }
      }
    `,
    variables: {
      canvas,
    },
  });

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
