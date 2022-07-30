import axios from 'axios';
import { useMutation } from 'react-query';

const sendEmail = async () => {
  return await axios.post('/api/graphql', {
    operationName: 'addEmailQueue',
    query: `
      mutation addEmailQueue {
        addEmailQueue {
          success
        }
      }
    `,
  });
};

export function useSaveCanvas() {
  return useMutation(sendEmail);
}

export default useSaveCanvas;
