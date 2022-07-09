import axios from 'axios';
import { useQuery } from 'react-query';

const query = async () => {
  const { data } = await axios.get('/api/canvas');
  return data;
};

export function useGetAllCanvases() {
  return useQuery(['canvas'], query);
}

export default useGetAllCanvases;
