import axios from 'axios';
import { useQuery } from 'react-query';

const query = (canvasId: string) => {
  return async () => {
    const {
      data: {
        data: { canvas },
      },
    } = await axios.post('/api/graphql', {
      operationName: 'GetCanvas',
      query: `
        query GetCanvas($canvasId: String!) {
          canvas(payload: { _id: $canvasId }) {
            _id,
            name,
            isNew,
            isPublic,
            contributors
          }
        }
      `,
      variables: {
        canvasId,
      },
    });

    return canvas;
  };
};

export function useGetCanvas(canvasId = '') {
  return useQuery(['canvas', canvasId], query(canvasId), {
    refetchOnMount: true,
  });
}

export default useGetCanvas;
