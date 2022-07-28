import axios from 'axios';
import { useQuery } from 'react-query';

interface Canvas {
  _id: string;
  name: string;
  contributors: string[];
  isNew: boolean;
}

const query = async () => {
  const {
    data: { data },
  } = await axios.post('/api/graphql', {
    operationName: 'GetAllCanvases',
    query: `
      query GetAllCanvases {
        canvases {
          _id,
          name,
          isNew,
          contributors
        }
      }
    `,
  });

  return data?.canvases ?? [];
};

export function useGetAllCanvases() {
  return useQuery<Canvas[]>(['canvas', 'all'], query, {
    refetchOnMount: true,
  });
}

export default useGetAllCanvases;
