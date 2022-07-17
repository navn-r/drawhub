import axios from 'axios';
import { useQuery } from 'react-query';

// TODO: Replace with shared interface from backend
interface Canvas {
  _id: string;
  name: string;
  contributors: string[];
  memberCount: number;
}

const query = async () => {
  const { data } = await axios.get('/api/canvas');
  return data;
};

export function useGetAllCanvases() {
  return useQuery<Canvas[]>(['canvas'], query, {
    refetchOnMount: true,
  });
}

export default useGetAllCanvases;
