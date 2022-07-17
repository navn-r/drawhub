import axios from 'axios';
import { useMutation } from 'react-query';

const saveCanvas = ({ canvasId, file }: { canvasId: string; file: Blob }) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(`/api/canvas/${canvasId}/upload`, formData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });
};

export function useSaveCanvas() {
  return useMutation(saveCanvas);
}

export default useSaveCanvas;
