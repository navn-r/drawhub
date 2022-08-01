import axios from 'axios';
import { useMutation } from 'react-query';

const uploadDrive = ({ canvasId, file }: { canvasId: string; file: Blob }) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(`/api/canvas/${canvasId}/drive`, formData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });
};

export function useUploadToDrive() {
  return useMutation(uploadDrive);
}

export default useUploadToDrive;
