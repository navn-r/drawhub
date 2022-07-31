import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const stitchCanvas = async (canvas: { _id: string; name: string; isPublic: boolean }) => {
  const {
    data: {
      data: { stitchCanvas: data },
    },
  } = await axios.post('/api/graphql', {
    operationName: 'StitchCanvas',
    query: `
      mutation StitchCanvas($canvas: StitchedCanvasInput!) {
        stitchCanvas(payload: $canvas) {
          _id,
          name,
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

export function useStitchCanvas() {
  const queryClient = useQueryClient();

  return useMutation(stitchCanvas, {
    onSuccess: () => {
      queryClient.invalidateQueries(['canvas']);
    },
  });
}

export default useStitchCanvas;
