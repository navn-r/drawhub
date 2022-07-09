import axios from 'axios';
import { useMutation } from 'react-query';

// TODO: Change to Canvas type once shared lib is created
const createCanvas = async (canvas: { name: string }) => {
  const { data } = await axios.post('/api/canvas', canvas);
  return data;
};

export function useCreateCanvas() {
  return useMutation(createCanvas);
}

export default useCreateCanvas;
